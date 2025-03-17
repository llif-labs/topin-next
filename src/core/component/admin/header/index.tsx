'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {AdminMenuData, MenuInterface} from '@/app/(route)/admin/admin-menu-data'
import {header, breadcrumbs} from '@/core/component/admin/header/style.css'
import React from 'react'

const AdminHeader = () => {
  const pathname = usePathname()

  // 브레드크럼 항목 생성
  const getBreadcrumbItems = (): MenuInterface[] => {
    const items: MenuInterface[] = [{path: '/admin', label: '어드민'}]

    for (const menu of AdminMenuData) {
      if (pathname === menu.path) {
        items.push({path: menu.path, label: menu.label})
        items.push({path: menu.path, label: menu.label}) // 현재 페이지 반복 추가
        break
      }
      if (pathname.startsWith(menu.path) && menu.child) {
        items.push({path: menu.path, label: menu.label})

        for (const subMenu of menu.child) {
          if (pathname === subMenu.path) {
            items.push({path: subMenu.path, label: subMenu.label})
            break
          }
        }
        break
      }
    }

    return items
  }

  const breadcrumbItems = getBreadcrumbItems()
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1]

  return (
    <header className={header.wrapper}>
      <p className={header.label}>{lastItem.label}</p>
      <nav className={breadcrumbs.nav}>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={breadcrumbs.span}> &gt; </span>}
            <span className={breadcrumbs.span} key={`${item.path}-${index}`}>
              {index === breadcrumbItems.length - 1 ? (
                item.label
              ) : (
                <Link className={breadcrumbs.a} href={item.path}>{item.label}</Link>
              )}
            </span>
          </React.Fragment>
        ))}
      </nav>
    </header>
  )
}

export default AdminHeader
