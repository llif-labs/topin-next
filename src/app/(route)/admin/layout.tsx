import { LayoutInterface } from '@/core/common/interface';
import { adminChildren, adminLayout } from '@/app/(route)/admin/style.css';
import AdminMenu from '@/core/component/admin/menu/AdminMenu';
import AdminHeader from '../../../core/component/admin/header'

export default async function Layout({ children }: LayoutInterface) {

  return (
    <div className={adminLayout}>
      <AdminMenu />

      <div className={adminChildren}>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
