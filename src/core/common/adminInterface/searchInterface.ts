import {FilterDataInterface} from '@/core/module/filter'

export interface FilterInterface {
  data: FilterDataInterface[],

  [key: string]: any
}

export interface DataInterface<T> {
  total: number
  size: number
  currentPage: number,
  list: T[]
}
