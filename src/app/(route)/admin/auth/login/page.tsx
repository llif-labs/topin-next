'use client'

import {buttonWrapper, login, loginTitle, prev, slider, spinner, submit} from '@/app/(route)/admin/auth/login/style.css'
import Input from '@/core/module/input'
import {useRef, useState} from 'react'
import axios from 'axios'


interface LoginState {
  username: string,
  password: string,
}

const Page = () => {

  const radio1Ref = useRef<HTMLInputElement>(null)  // radio-2 버튼에 대한 ref 생성
  const radio2Ref = useRef<HTMLInputElement>(null)  // radio-2 버튼에 대한 ref 생성

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [verifyCode, setVerifyCode] = useState<string>('')
  const [state, setState] = useState<LoginState>({
    username: '',
    password: '',
  })

  const handleUpdateLoginInfo = (k: string, v: string) => {
    setState(prev => ({...prev, [k]: v}))
  }

  const handlePrev = () => {
    if (radio1Ref.current) {
      radio1Ref.current.checked = true
    }
  }

  const onLoginSubmit = () => {
    setIsLoading(true)
    axios.post('/api/auth/login', state).then(res => {
      if (radio2Ref.current) radio2Ref.current.checked = true
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const onVerifySubmit = () => {
    setIsLoading(true)
    axios.post('/api/auth/verifyEmail', {code: verifyCode}).then(
      async (res) => {
        console.log(res)
        window.location.replace('/admin')
      },
      error => {
        console.log(error)
      }
    ).finally(() => {
      setIsLoading(false)
    })
  }

  return <div className={login}>

    <input type={'radio'} name={'login-radio'} id={'login-radio-1'} ref={radio1Ref} defaultChecked={true}/>
    <input type={'radio'} name={'login-radio'} id={'login-radio-2'} ref={radio2Ref}/>

    <div className={slider.inner.wrapper}>

      <div className={slider.inner.content}>
        <div className={loginTitle.wrapper}>
          <h3 className={loginTitle.title}> LOGIN </h3>
          <p className={loginTitle.sub}>안녕하세요, 관리자 로그인 페이지 입니다.</p>
        </div>

        <form action={onLoginSubmit}>
          <Input
            label={'username'} type={'text'} value={state.username}
            onChange={v => handleUpdateLoginInfo('username', v)}
          />
          <Input
            label={'password'} type={'password'} value={state.password}
            onChange={v => handleUpdateLoginInfo('password', v)}
          />


          <div className={buttonWrapper}>
            <button className={submit} type={'submit'} disabled={isLoading}>
              {isLoading ? <span className={spinner}/> : '로그인'}
            </button>
          </div>

        </form>
      </div>

      <div className={slider.inner.content}>
        <div className={loginTitle.wrapper}>
          <h3 className={loginTitle.title}> VERIFY </h3>
          <p className={loginTitle.sub}>가입 정보에 기입된 이메일로<br/> 인증번호를 발송하였습니다.</p>
        </div>
        <form action={onVerifySubmit}>
          <Input
            label={'code'} type={'text'} value={verifyCode} minLength={0} maxLength={6}
            onChange={v => setVerifyCode(v)}
          />

          <div className={buttonWrapper}>
            <button className={prev} type={'button'} onClick={handlePrev}> 뒤로가기</button>
            <button className={submit} type={'submit'}> 로그인</button>
          </div>
        </form>
      </div>

    </div>
  </div>
}

export default Page
