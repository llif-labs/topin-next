'use client'

import {DataInterface, FilterInterface} from '@/core/common/adminInterface/searchInterface'
import Filter, {FilterDataInterface, FilterTypeInterface} from '@/core/module/filter'
import AdminUserStyle from '@/app/(route)/admin/content/user/style.css'
import Table from '@/core/module/table'
import DateUtil from '@/core/util/dateUtil'
import Pagination from '@/core/module/pagination'
import React, {useCallback, useEffect, useState} from 'react'
import useToast from '@/core/common/hooks/ui/toast/useToast'
import {Req} from '@/core/module/service/apiInterface'
import API from '@/core/module/service/api'
import useDialog from '@/core/common/hooks/ui/dialog/useDialog'
import {useRouter} from 'next/navigation'
import ApprovedDialog from '@/app/(route)/admin/content/issue/ApprovedDialog'

const tableTitle = ['상태', '생성자', '제목', '조회수', '참여자', '생성일']

interface IssueInterface {
  id: number
  user_id: number
  name: string
  creator: string
  reason: string | null
  views: number
  is_approved: number
  participant_count: number
  created_at: string
  updated_at: string
}

const filterTypeData: FilterTypeInterface[] = [
  {
    label: '이름',
    name: 'searchType',
    type: 'search',
    data: [
      {label: '이름', value: 'name'},
    ],
  },
  {
    label: '상태',
    name: 'status',
    type: 'select',
    data: [
      {label: '전체', value: 'all'},
      {label: '승인', value: 1},
      {label: '대기', value: 0},
      {label: '반려', value: -1},
    ],
  },
]

const initialData: DataInterface<IssueInterface> = {
  total: 0,
  size: 10,
  currentPage: 1,
  list: [],
}

const Page = () => {

  const {addToast} = useToast()
  const {mountDialog, unmountDialog} = useDialog()

  const router = useRouter()

  const [filter, setFilter] = useState<FilterInterface>({data: []})
  const [data, setData] = useState<DataInterface<IssueInterface>>(initialData)

  const handleOpenDialog = (v: any) => {
    let rejectReason: string = ''

    const submitApproval = (status: number) => {
      if (status === -1 && !rejectReason) {
        addToast({type: 'warning', message: '반려 사유가 비어있습니다. 다시 확인해주세요.'})
        return
      }
      API.call({
        url: '/v1/admin/issue/approved',
        method: 'patch',
        params: {
          issueId: v.id,
          rejectReason: rejectReason,
          status: status,
        },
      }).then(
        res => {
          const temp: IssueInterface[] = [...data.list]
          const findIndex: number = temp.findIndex(item => item.id === v.id)
          temp[findIndex].is_approved = status
          setData(prev => ({
            ...prev,
            list: temp,
          }))
          unmountDialog()
          addToast({
            type: 'info',
            message: res.message,
          })
        },
        error => console.log(error),
      )
    }

    if (v.is_approved != 1) {
      mountDialog(<ApprovedDialog
        name={v.name}
        regiReason={v.reason}
        reject={v.reject_reason || ''}
        onChange={v => rejectReason = v}
      />, 3, '반려', () => submitApproval(-1), '승인', () => submitApproval(1))
    } else {
      router.push(`issue/detail/${v.id}`)
    }
  }

  const handleUpdatePage = (page: number) => {
    setData(prev => ({...prev, currentPage: page}))
  }

  const handleChangeFilter = (data: FilterDataInterface[]) => {
    setFilter({
      data: [...data],
    })
  }

  const onGetListSize = useCallback(() => {
    const listCfg: Req = {method: 'POST', url: '/v1/admin/issue/list/size', params: filter}
    API.call<{ total: number }>(listCfg).then(
      res => setData(prev => ({
        ...prev,
        total: res.payload.total,
      })),
      error => addToast({type: 'warning', message: error.message}),
    )
  }, [filter])

  const onGetItemList = useCallback(() => {
    const listCfg: Req = {
      method: 'POST',
      url: '/v1/admin/issue/list',
      params: {...filter, currentPage: data.currentPage, size: data.size},
    }

    API.call<any[]>(listCfg).then(
      res => {
        setData(prev => ({...prev, list: [...res.payload]}))
        addToast({
          type: 'info',
          message: res.message,
        })
      },
      error => addToast({type: 'warning', message: error.message}),
    )
  }, [filter, data.currentPage, data.size])

  useEffect(() => {
    if (filter.data.length > 0) {
      if (data.total === 0) onGetListSize()
      else onGetItemList()
    }
  }, [data.total, data.currentPage, onGetItemList, onGetListSize])

  useEffect(() => {
    setData(initialData)
  }, [filter])

  return <div className={AdminUserStyle.main}>
    <Filter data={filterTypeData} onChange={handleChangeFilter}/>

    <Table
      isChecked={false}
      thead={tableTitle}
      onClick={handleOpenDialog}
      data={data.list}
      colGroup={<colgroup>
        <col width={10}/>
        <col width={70}/>
        <col width={300}/>
        <col width={50}/>
        <col width={50}/>
        <col width={120}/>
      </colgroup>}
      render={(data) => <>
        <td>{data.is_approved === -1 ? '반려' : data.is_approved === 0 ? '대기' : '승인'}</td>
        <td>{data.creator}</td>
        <td>{data.name}</td>
        <td>{data.views} 회</td>
        <td>{data.participant_count} 명</td>
        <td>{DateUtil.format(data.created_at, 'YYYY-MM-DD HH:mm')}</td>
      </>}
    />

    <Pagination
      currentPage={data.currentPage}
      size={data.size}
      totalItem={data.total}
      onPageChange={handleUpdatePage}
    />
  </div>
}

export default Page
