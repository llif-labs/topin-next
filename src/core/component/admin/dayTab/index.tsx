'use client'

import dayTap from '@/core/component/admin/dayTab/style.css'
import {useState} from 'react'

const filter = [
  {label: 'All', value: 'all'},
  {label: 'Yesterday', value: 'day'},
  {label: '7 days', value: 'week'},
  {label: '30 days', value: 'month'},
  {label: '12 month', value: 'year'},
]

const Index = () => {

  const [active, setActive] = useState<number>(0)

  return <div className={dayTap.wrapper}>
    {
      filter.map((item, key) => (
        <button
          key={key}
          className={`${dayTap.item} ${key === active ? 'active' : ''}`}
          onClick={() => {
            setActive(key)
          }}
        >
          {item.label}
        </button>
      ))
    }
  </div>
}

export default Index
