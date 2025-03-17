'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AdminMenuData, MenuInterface } from '@/app/(route)/admin/admin-menu-data';
import {header, breadcrumbs} from '@/core/component/admin/header/style.css'

const AdminHeader = () => {
  const pathname = usePathname();

  // 브레드크럼 항목 생성 함수
  const getBreadcrumbItems = (): MenuInterface[] => {
    const items: MenuInterface[] = [{ path: '/admin', label: '어드민' }]; // 항상 "어드민"으로 시작

    // 1. 상위 메뉴 매핑
    for (const menu of AdminMenuData) {
      if (pathname === menu.path) {
        items.push({ path: menu.path, label: menu.label });
        // 현재 페이지 레이블을 마지막에 반복 추가
        items.push({ path: menu.path, label: menu.label });
        break;
      } else if (pathname.startsWith(menu.path) && menu.child) {
        items.push({ path: menu.path, label: menu.label });

        // 2. 하위 메뉴 매핑
        for (const subMenu of menu.child) {
          if (pathname === subMenu.path) {
            items.push({ path: subMenu.path, label: subMenu.label });
            break;
          }
        }
        break;
      }
    }

    return items;
  };

  const breadcrumbItems: MenuInterface[] = getBreadcrumbItems();

  return (
    <header className={header.wrapper}>
      <p className={header.label}>{breadcrumbItems[breadcrumbItems.length - 1].label}</p>
      <div className={breadcrumbs.nav}>
        {breadcrumbItems.map((item: MenuInterface, index: number) => (
          <span className={breadcrumbs.span} key={`${item.path}-${index}`}>
          {index > 0 && ' > '}
            {index === breadcrumbItems.length - 1 ? (
              <Link href={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
        </span>
        ))}
      </div>
    </header>
  );
};

export default AdminHeader;
