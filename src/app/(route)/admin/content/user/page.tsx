'use client'

import Table from '@/core/module/table'

const tableTitle = ['SNS', '이름', '계정', '상태']

const data = [
  {
    social: 'google',
    name: '김남규',
    username: 'vpdls1511@gmail.com',
    access: 1,
  },
]

const Page = () => {
  return <>
    <Table
      thead={tableTitle}
      data={data}
      colGroup={<colgroup>
        <col width={10}/>
        <col width={100}/>
        <col width={200}/>
        <col width={200}/>
        <col width={100}/>
      </colgroup>}
      render={(data) => <>
        <td>{data.social}</td>
        <td>{data.name}</td>
        <td>{data.username}</td>
        <td>{data.access === 1 ? '허용' : '제한'}</td>
      </>}
    />
  </>
}

export default Page
