'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {AdminMenuData, MenuInterface} from '@/app/(route)/admin/admin-menu-data'
import {header, breadcrumbs} from '@/core/component/admin/header/style.css'
import React from 'react'
import StringUtil from '@/core/util/StringUtil'

const AdminHeader = () => {
  const pathname = usePathname()

  const getBreadcrumbItems = (): MenuInterface[] => {
    const items: MenuInterface[] = [{path: '/admin', label: '어드민'}]

    const findPath = (
      menuList: MenuInterface[],
      trail: MenuInterface[] = []
    ): MenuInterface[] | null => {
      for (const menu of menuList) {
        const currentTrail = [...trail, {path: menu.path, label: menu.label}]

        if (pathname === menu.path || StringUtil.matchPath(menu.path, pathname)) {
          if (!menu.child) return currentTrail

          const found = findPath(menu.child, currentTrail)
          if (found) return found

          return currentTrail
        }

        // 자식이 있으면 계속 탐색
        if (menu.child) {
          const found = findPath(menu.child, currentTrail)
          if (found) return found
        }
      }
      return null
    }

    const result = findPath(AdminMenuData)
    if (result) items.push(...result)

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
