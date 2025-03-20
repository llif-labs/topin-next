import {LayoutInterface} from '@/core/common/interface/default'
import {adminAuthLayout} from '@/app/(route)/admin/auth/style.css'

const AdminAuthLayout = ({children}: LayoutInterface) => {
  return<div className={adminAuthLayout}>
    {children}
  </div>
}

export default AdminAuthLayout
