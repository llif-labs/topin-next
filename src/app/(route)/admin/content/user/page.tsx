'use client'

import Table from '@/core/module/table'
import React, {useCallback, useEffect, useState} from 'react'
import API from '@/core/module/service/api'
import {Req} from '@/core/module/service/apiInterface'
import Pagenation from '@/core/module/pagenation'
import AdminUserStyle from '@/app/(route)/admin/content/user/style.css'
import Filter from '@/core/module/filter'

const tableTitle = ['PROVIDER', '이름', '닉네임', '계정', '나이', '상태', '마지막 로그인', '생성일']
type StateFilter = 'all' | 'active' | 'banned' | 'deactivated'

interface FilterInterface {
  status: StateFilter,

  [key: string]: any
}

interface AuthListInterface {
  id: number,
  role: number,
  username: string
  password: string
  email: string
  nickname: string
  name: string
  bio: string
  birth: string
  status: string
  last_login: string
  created_at: string
  updated_at: string
  provider: string | null,
  provider_uid: string | null
}

interface DataInterface {
  total: number
  size: number
  currentPage: number,
  list: AuthListInterface[]
}


const Page = () => {

  const [filter, setFilter] = useState<FilterInterface>({
    status: 'all',
  })
  const [data, setData] = useState<DataInterface>({
    total: 0,
    size: 10,
    currentPage: 1,
    list: [],
  })

  const handleUpdatePage = (page: number) => {
    setData(prev => ({...prev, currentPage: page}))
  }

  const onGetListSize = useCallback(() => {
    const listCfg: Req = { method: 'POST', url: '/api/admin/auth/list/size', params: filter }
    API.call<{ total: number }>(listCfg).then(
      res => setData(prev => ({ ...prev, total: res.payload.total })),
      error => console.log(error.message),
    )
  }, [filter])

  const onGetItemList = useCallback(() => {
    const listCfg: Req = {
      method: 'POST',
      url: '/api/admin/auth/list',
      params: { ...filter, currentPage: data.currentPage, size: data.size },
    }
    API.call<AuthListInterface[]>(listCfg).then(
      res => setData(prev => ({ ...prev, list: [...res.payload] })),
      error => console.log(error.message),
    )
  }, [filter, data.currentPage, data.size])

  useEffect(() => {
    setFilter({status: 'all'})
  }, [])

  useEffect(() => {
    if (data.total === 0) onGetListSize()
    else onGetItemList()
  }, [data.total, data.currentPage, onGetItemList, onGetListSize])

  return <div className={AdminUserStyle.main}>
    <Filter />
    <Table
      thead={tableTitle}
      data={data.list}
      colGroup={<colgroup>
        <col width={10}/>
        <col width={100}/>
        <col width={100}/>
      </colgroup>}
      render={(data) => <>
        <td>{data.provider || 'email'}</td>
        <td>{data.name}</td>
        <td>{data.nickname}</td>
        <td>{data.username}</td>
        <td>{data.birth}</td>
        <td>{data.status}</td>
        <td>{data.last_login}</td>
        <td>{data.created_at}</td>
      </>}
    />

    <Pagenation
      currentPage={data.currentPage}
      totalPages={data.total}
      onPageChange={handleUpdatePage}
    />
  </div>
}

export default Page
