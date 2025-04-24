'use client'

import Table from '@/core/module/table'
import React, {useCallback, useEffect, useState} from 'react'
import API from '@/core/module/service/api'
import {Req} from '@/core/module/service/apiInterface'
import Pagination from '@/core/module/pagination'
import AdminUserStyle from '@/app/(route)/admin/content/user/style.css'
import Filter, {FilterDataInterface, FilterTypeInterface} from '@/core/module/filter'
import useToast from '@/core/common/hooks/ui/toast/useToast'
import DateUtil from '@/core/util/dateUtil'
import {DataInterface, FilterInterface} from '@/core/common/adminInterface/searchInterface'

const tableTitle = ['상태', '신고자', '대상', '신고내용', '신고일']
const status = ['신규', '처리', '반려']

interface ReportListInterface {
  id : number,
  report_type : string,
  reporter : string,
  createdAt : string,
  target : string,
  status : number,
  reason : number,
}

const filterTypeData: FilterTypeInterface[] = [
  {
    label: '처리 상태',
    name: 'status',
    type: 'select',
    data: [
      {label: '전체', value: 'all'},
      {label: '신규', value: 0},
      {label: '처리완료', value: 1},
      {label: '반려', value: 2},
    ],
  },
]

const initialData: DataInterface<ReportListInterface> = {
  total: 0,
  size: 10,
  currentPage: 1,
  list: [],
}

const Page = () => {

  const {addToast} = useToast()

  const [filter, setFilter] = useState<FilterInterface>({
    data: []
  })
  const [data, setData] = useState<DataInterface<ReportListInterface>>(initialData)

  const handleUpdatePage = (page: number) => {
    setData(prev => ({...prev, currentPage: page}))
  }

  const handleChangeFilter = (data: FilterDataInterface[]) => {
    setFilter({data: data})
  }

  const onGetListSize = useCallback(() => {
    const listCfg: Req = {method: 'POST', url: '/v1/admin/report/user/list/size', params: filter}
    API.call<{ total: number }>(listCfg).then(
      res => setData(prev => ({...prev,
        total: res.payload.total
      })),
      error => addToast({type: 'warning', message: error.message}),
    )
  }, [filter])

  const onGetItemList = useCallback(() => {
    const listCfg: Req = {
      method: 'POST',
      url: '/v1/admin/report/user/list',
      params: {...filter, currentPage: data.currentPage, size: data.size},
    }

    API.call<ReportListInterface[]>(listCfg).then(
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
    if(filter.data.length > 0) {
      if (data.total === 0) onGetListSize()
      else onGetItemList()
    }
  }, [data.total, data.currentPage, onGetItemList, onGetListSize])

  useEffect(() => {
    setData(initialData)
  }, [filter])

  return <div className={AdminUserStyle.main}>
    <Filter
      data={filterTypeData}
      onChange={handleChangeFilter}
    />

    <Table
      isChecked={false}
      note={'초록 = 활성 , 빨강 = 차단 , 회색 = 비활성'}
      thead={tableTitle}
      data={data.list}
      colGroup={<colgroup>
        <col width={65}/>
        <col width={100}/>
        <col width={100}/>
        <col width={200}/>
        <col width={100}/>
      </colgroup>}
      render={(data) => <>
        <td>{status[data.status]}</td>
        <td>{data.reporter}</td>
        <td>{data.target}</td>
        <td>{data.reason}</td>
        <td>{DateUtil.format(data.createdAt, 'YYYY-MM-DD')}</td>
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
