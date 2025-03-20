import { LayoutInterface } from '@/core/common/interface/default';
import { adminChildren, adminLayout } from '@/app/(route)/admin/content/style.css';
import AdminMenu from '@/core/component/admin/menu/AdminMenu';
import AdminHeader from '../../../../core/component/admin/header'

export const metadata = {
  title: 'TOPIN - ADMIN',
  robots: 'noindex', // 검색 엔진 차단
};

export default  function Layout({ children }: LayoutInterface) {
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
