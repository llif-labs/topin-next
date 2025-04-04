import {filterStyle, filterSelect, filterSearch, filterHeight} from '@/core/module/filter/style.css'
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import SvgIcon from '@/core/module/svgIcon'
import Input from '@/core/module/input'
import useDebounce from '@/core/common/hooks/useDebounce'

export interface FilterTypeInterface {
  label: string,
  name: string
  type: 'search' | 'select'
  data?: {
    label: string,
    value: string | number
  }[]
}

export interface FilterDataInterface {
  type: string
  label: string
  value: string | number
}

interface ItemPropsInterface {
  onChange: (type: string, k: string, v: string | number) => void
}

interface FilterInterface {
  data: FilterTypeInterface[]
  onChange: (data: FilterDataInterface[]) => void
}

const Index = ({data, onChange}: FilterInterface) => {

  const [filter, setFilter] = useState<FilterDataInterface[]>([])

  const resetRef = useRef<{ handleResetState: () => void }[]>([])
  const handleUpdateFilter = (
    type: string,
    k: string,
    v: string | number) => {
    const item: FilterDataInterface = {type, label: k, value: v}
    const itemIndex = filter.findIndex((item) => item.type === type)

    if (itemIndex !== -1) {
      const temp = [...filter]
      temp[itemIndex] = item
      setFilter(temp)
    } else {
      setFilter(prev => [...prev, item])
    }

  }

  const handleResetFilter = () => {
    if (resetRef.current[0]) {
      resetRef.current.forEach(item => {
        item.handleResetState()
      })
    }
  }

  useEffect(() => {
    onChange(filter)
  }, [filter])

  return <div className={filterStyle.body}>
    <div className={filterStyle.inner}>
      {
        data.map((item, key) => {
          if (item.type === 'select') {
            return <SelectItem
              key={key}
              name={item.name}
              ref={(el) => {
                if (el && !resetRef.current.includes(el)) {
                  resetRef.current.push(el)
                }
              }}
              label={item.label}
              type={item.type}
              data={item.data}
              onChange={handleUpdateFilter}
            />
          } else {
            return <SearchItem
              key={key}
              name={item.name}
              ref={(el) => {
                if (el && !resetRef.current.includes(el)) {
                  resetRef.current.push(el)
                }
              }}
              label={item.label}
              type={item.type}
              data={item.data}
              onChange={handleUpdateFilter}
            />
          }
        })
      }
    </div>
    <button
      className={filterStyle.button}
      onClick={handleResetFilter}
    > 초기화
    </button>
  </div>
}

const SelectItem = forwardRef<{ handleResetState: () => void }, FilterTypeInterface & ItemPropsInterface>((
  props, ref) => {

  const [data, setData] = useState<{ label: string, value: string | number }>({label: props.label, value: ''})
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleResetState = () => {
    setData(({label: props.label, value: ''}))
  }

  useImperativeHandle(ref, () => ({
      handleResetState,
    }),
  )

  useEffect(() => {
    props.onChange(props.name, data.label, data.value)
  }, [data])

  return <div className={filterSearch.body}>
    <div className={`${filterSelect.body} ${isOpen ? 'active' : ''}`}>
      <div className={`${filterSelect.title} ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {data.label}
        <SvgIcon
          src={'/assets/svg/icon/arrow-down-icon.svg'}
          size={14}
          stroke={isOpen ? '#FFFFFF' : '#1A1A1A'}
          className={`${filterSelect.arrow} ${isOpen ? 'active' : ''}`}
        />
      </div>
      <ul className={filterSelect.list.body}>
        {
          props.data?.map((item, key) => {
            return <li key={key} className={filterSelect.list.item}
                       onClick={() => {
                         setIsOpen(false)
                         setData(item)
                       }}>
              {item.label}
            </li>
          })
        }
      </ul>
    </div>
  </div>
})

const SearchItem = forwardRef<{ handleResetState: () => void }, FilterTypeInterface & ItemPropsInterface>((
  props, ref) => {

  const [data, setData] = useState<{ label: string, value: string | number }>({label: props.label, value: ''})
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')
  const debounceSearch = useDebounce(search, 500)

  const handleResetState = () => {
    setData(({label: props.label, value: ''}))
    setSearch('')
  }

  useImperativeHandle(ref, () => ({
      handleResetState,
    }),
  )

  useEffect(() => {
    props.onChange(props.name, data.value.toString(), debounceSearch)
  }, [data.value, debounceSearch])

  return <div className={filterSearch.body}>
    <div className={`${filterSelect.body} ${isOpen ? 'active' : ''}`}>
      <div className={`${filterSelect.title} ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {data.label}
        <SvgIcon
          src={'/assets/svg/icon/arrow-down-icon.svg'}
          size={14}
          stroke={isOpen ? '#FFFFFF' : '#1A1A1A'}
          className={`${filterSelect.arrow} ${isOpen ? 'active' : ''}`}
        />
      </div>
      <ul className={filterSelect.list.body}>
        {
          props.data?.map((item, key) => {
            return <li key={key} className={filterSelect.list.item}
                       onClick={() => {
                         setIsOpen(false)
                         setData(item)
                       }}>
              {item.label}
            </li>
          })
        }
      </ul>
    </div>

    <Input
      type={'text'}
      placeHolder={'검색어'}
      value={search}
      onChange={v => setSearch(v)}
      removePadding={true}
      $borderRadius={'.8rem'}
      $width={'15rem'}
      $padding={'1rem 1rem'}
      $height={filterHeight}
    />

  </div>

})

SelectItem.displayName = 'SelectItem'
SearchItem.displayName = 'SearchItem'

export default Index
