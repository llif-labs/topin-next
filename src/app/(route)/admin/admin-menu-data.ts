export interface MenuInterface {
  path: string
  label: string
  child?: MenuInterface[]
}


export const IssueMenu: MenuInterface[] = [
  {path: '/admin/issue/regi', label: '등록된 이슈'},
  {path: '/', label: '대기중 이슈'},
]

export const ComplainMenu: MenuInterface[] = [
  {path: '/', label: '신고된 이슈'},
  {path: '/', label: '신고된 게시글'},
  {path: '/', label: '신고된 댓글'},
  {path: '/', label: '신고된 유저'},
]

export const PopupMenu: MenuInterface[] = [
  {path: '/', label: '공지사항'},
  {path: '/', label: '이슈 팝업'},
]

export const SettingMenu: MenuInterface[] = [
  {path: '/', label: '준비중1'},
  {path: '/', label: '준비중2'},
]

export const AdminMenuData: MenuInterface[] = [
  {path: '/admin/dashboard', label: '대시보드'},
  {path: '/admin/issue', label: '이슈관리', child: IssueMenu},
  {path: '/admin', label: '신고관리', child: ComplainMenu},
  {path: '/admin', label: '공지관리', child: PopupMenu},
  {path: '/admin', label: '환경설정', child: SettingMenu},
]
