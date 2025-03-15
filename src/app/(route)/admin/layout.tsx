import {LayoutInterface} from '@/core/common/interface'
import {adminChildren, adminContent, adminLayout} from '@/app/(route)/admin/style.css'
import AdminHeader from '@/core/component/admin/header/AdminHeader'
import AdminMenu from '@/core/component/admin/menu/AdminMenu'
import AdminFooter from '@/core/component/admin/footer/AdminFooter'

const Layout = ({children}: LayoutInterface) => {
  return<div className={adminLayout}>
    <AdminHeader />
    <div className={adminContent}>
      <AdminMenu />
      <div className={adminChildren}>
        {children}
      </div>
    </div>
    <AdminFooter />
  </div>
}

export default Layout
