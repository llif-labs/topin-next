'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {AdminMenuData, MenuInterface} from '@/app/(route)/admin/admin-menu-data'

const Breadcrumbs = () => {
  const pathname = usePathname()

  if (pathname === '/admin/dashboard') return null

  // 브레드크럼 항목 생성 함수
  const getBreadcrumbItems = (): MenuInterface[] => {
    const items: MenuInterface[] = []

    // 1. 상위 메뉴 매핑
    for (const menu of AdminMenuData) {
      if (pathname === menu.path) {
        items.push({path: menu.path, label: menu.label})
        break // 정확히 일치하면 더 탐색하지 않음
      } else if (pathname.startsWith(menu.path) && menu.child) {
        items.push({path: menu.path, label: menu.label})

        // 2. 하위 메뉴 매핑
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

  const breadcrumbItems: MenuInterface[] = getBreadcrumbItems()

  return (
    <nav>
      {breadcrumbItems.map((item: MenuInterface, index: number) => (
        <span key={item.path}>
          {index > 0 && ' > '}
          {index === breadcrumbItems.length - 1 ? (
            <span>{item.label}</span>
          ) : (
            <Link href={item.path}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
