import {adminMenu, checkbox, list, menuItem, menuLabel, menuList} from '@/core/component/admin/menu/style.css'

const AdminMenu = () => {
  return <nav className={adminMenu}>
    <div className={menuList}>
      <div className={menuItem}>
        <input type={'checkbox'} className={checkbox} id={'menu-1'}/>
        <label className={menuLabel} htmlFor={'menu-1'}>이슈</label>
        <ul className={list}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
    <div></div>
  </nav>
}

export default AdminMenu
