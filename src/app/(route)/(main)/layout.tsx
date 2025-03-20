import './style.css';
import React, {JSX} from 'react'
import {LayoutInterface} from '@/core/common/interface/default'
import Header from '@/core/component/header'
import {layout, mainBody, sideInfo} from '@/app/(route)/(main)/style.css'

const Layout = ({ children }: LayoutInterface): JSX.Element => {
  return <div className={layout}>
    <div className={mainBody}>
      <Header />
      <main>
        {children}
      </main>
    </div>
    <div className={sideInfo}>

    </div>
  </div>;
};

export default Layout;
