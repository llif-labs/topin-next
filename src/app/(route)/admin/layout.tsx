import {LayoutInterface} from '@/core/common/interface'
import {adminChildren, adminLayout} from '@/app/(route)/admin/style.css'
import AdminMenu from '@/core/component/admin/menu/AdminMenu'

const Layout = ({children}: LayoutInterface) => {
  return<div className={adminLayout}>
    <AdminMenu />
    <div className={adminChildren}>
      {children}
    </div>
  </div>
}

export default Layout
