import { LayoutInterface } from '@/core/common/interface';
import { adminChildren, adminLayout } from '@/app/(route)/admin/style.css';
import AdminMenu from '@/core/component/admin/menu/AdminMenu';
import Breadcrumbs from '@/core/component/admin/breadcrumbs'

export default async function Layout({ children }: LayoutInterface) {

  return (
    <div className={adminLayout}>
      <AdminMenu />

      <div className={adminChildren}>
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
