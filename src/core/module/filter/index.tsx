import {filterStyle, search} from '@/core/module/filter/style.css'
import {useState} from 'react'
import SvgIcon from '@/core/module/svgIcon'

export interface FilterTypeInterface {
  label: string,
  type: 'search' | 'select'
  data: {
    label: string,
    value: string | number
  }[]
}

interface FilterInterface {
  data: FilterTypeInterface[]
}

const Index = ({data}: FilterInterface) => {
  return <div className={filterStyle.body}>
    {/*<p>필터</p>*/}
    {
      data.map((item, key) => {
        if (item.type === 'select') {
          return <SelectItem
            key={key}
            label={item.label}
            type={item.type}
            data={item.data}
          />
        }
      })
    }
  </div>
}

const SelectItem = (props: FilterTypeInterface) => {

  const [label, setLabel] = useState<string>(props.label)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return <div className={`${search.body} ${isOpen ? 'active' : ''}`}>
    <div className={`${search.title} ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      {label}
      <SvgIcon
        src={'/assets/svg/icon/arrow-down-icon.svg'}
        size={14}
        stroke={isOpen ? '#FFFFFF' : '#1A1A1A'}
        className={`${search.arrow} ${isOpen ? 'active' : ''}`}
      />
    </div>
    <ul className={search.list.body}>
      {
        props.data.map((item, key) => {
          return <li key={key} className={search.list.item} onClick={() => setLabel(item.label)}>{item.label}</li>
        })
      }
    </ul>
  </div>
}

export default Index
