'use client'

import inputText from '@/core/module/input/style.css'
import React, { useEffect, useState } from 'react'

type inputType = 'text' | 'number' | 'email' | 'phone' | 'password'

interface InputInterface {
  label: string
  type: inputType,
  value?: string,
  maxLength?: number,
  minLength?: number
  onChange: (v: string) => void
}

// invalidType의 타입을 명확히 지정
const invalidType: { [key in inputType]: string } = {
  'phone': '올바르지 않은 전화번호 형식 입니다.',
  'number': '올바르지 않은 숫자 형식 입니다.',
  'email': '올바르지 않은 이메일 형식 입니다.',
  'text': '올바르지 않은 텍스트 형식 입니다.',
  'password': '',
}

const Index = (props: InputInterface) => {
  const { label, type, value, minLength, maxLength, onChange} = props

  const [v, setV] = useState<string>('')  // v는 string 타입
  const [isInvalid, setIsInvalid] = useState<boolean>(false)  // isInvalid는 boolean 타입

  // handleChangeValue 함수에 event 타입을 명확히 설정
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setV(newValue)

    // validation 로직 예시
    if (type === 'phone' && !/^\d{10,11}$/.test(newValue)) {
      setIsInvalid(true)
    } else if (type === 'number' && isNaN(Number(newValue))) {
      setIsInvalid(true)
    } else if (type === 'email' && !/\S+@\S+\.\S+/.test(newValue)) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }

    onChange(newValue)
  }

  const handleCheckBlur = () => {
    if(v === '') setIsInvalid(false)
  }

  useEffect(() => {
    if (value) setV(value)
  }, [value])

  return (
    <div className={`${inputText.wrapper} ${isInvalid && 'active'}`}>
      <div className={`${inputText.box.wrapper}`}>
        <input
          className={inputText.box.input}
          type={type}  // `type`을 동적으로 설정
          value={v}
          onChange={handleChangeValue}
          maxLength={maxLength}
          minLength={minLength}
          onBlur={handleCheckBlur}
        />
        <p className={`${inputText.box.label} ${v && 'active'}`}>{label}</p>
      </div>
      <p className={`${inputText.warning} ${isInvalid && 'active'}`}>{invalidType[type]}</p>
    </div>
  )
}

export default Index
