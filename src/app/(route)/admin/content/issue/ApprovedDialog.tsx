'use client'

import Input from '@/core/module/input'
import {useEffect, useState} from 'react'
import useDebounce from '@/core/common/hooks/useDebounce'

interface ApprovedDialogInterface {
  onChange: (v: string) => void
  name: string
  regiReason: string
  reject: string
}

const ApprovedDialog = ({
                          onChange,
                          name,
                          regiReason,
                          reject,
                        }: ApprovedDialogInterface) => {

  const [reason, setReason] = useState<string>(reject || '')
  const debounceValue = useDebounce(reason, 100)


  useEffect(() => {
    if (onChange) {
      onChange(debounceValue)
    }
  }, [debounceValue])

  return <>
    <p>{name}</p>
    <p>{regiReason}</p>
    <Input
      type={'text'}
      onChange={setReason}
      value={reject}
    />
  </>
}

export default ApprovedDialog
