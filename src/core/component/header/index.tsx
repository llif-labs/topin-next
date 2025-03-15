import './style.css'
import {authButton, header, headerAuth} from '@/core/component/header/style.css'
import Image from 'next/image'

const Index = () => {
  return <header className={header}>
    <Image src={'/assets/svg/issue-chat-logo.svg'} alt={'logo'} width={60} height={60} />
    <div className={headerAuth}>
      <button className={authButton+ ' active'}> 로그인 / 회원가입 </button>
    </div>
  </header>
}

export default Index
