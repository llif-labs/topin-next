'use client' // 클라이언트 컴포넌트로 지정

import {
  adminHeader,
  adminListWrapper,
  adminButtonWrapper,
  adminMenu,
  adminMenuList,
  label,
  category, adminButton
} from '@/core/component/admin/menu/style.css'
import {AdminMenuData, MenuInterface} from '@/app/(route)/admin/admin-menu-data'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const AdminMenu = () => {
  const pathname = usePathname() // 현재 경로 가져오기

  return (
    <nav className={adminMenu}>
      <div className={adminHeader}>Hello,</div>

      <div className={adminListWrapper}>
        {AdminMenuData.map((menu: MenuInterface, key: number) => {
          return (
            <div key={key} className={adminMenuList}>
              <p className={category}>{menu.label}</p>
              {
                menu.child ?
                  menu.child.map((sub: MenuInterface, subKey: number) => {
                    const isActive = pathname === sub.path
                    return (
                      <Link
                        key={subKey}
                        className={`${label} ${isActive ? 'active' : ''}`} // 동적으로 클래스 적용
                        href={sub.path}
                      >
                        {sub.label}
                      </Link>
                    )
                  }) :
                  <Link
                    key={key}
                    className={`${label} ${pathname === menu.path ? 'active' : ''}`} // 단일 메뉴도 활성화 체크
                    href={menu.path}
                  >
                    {menu.label}
                  </Link>
              }
            </div>
          )
        })}
      </div>

      <div className={adminButtonWrapper}>
        <p className={adminButton}>로그아웃</p>
      </div>
    </nav>
  )
}

// <button className={adminLogoutButton}> 로그아웃</button>

export default AdminMenu
