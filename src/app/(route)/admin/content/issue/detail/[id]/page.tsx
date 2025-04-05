'use client'

import {useParams} from 'next/navigation'

export interface DetailInterface {
  [key: string]: string | string[] | undefined
  id: string
}

const Page = () => {
  const {id} = useParams<DetailInterface>()

  return<>
    {id}
  </>
}

export default Page
