export interface MenuInterface {
  path: string
  label: string
  child?: MenuInterface[]
}

export const IssueMenu: MenuInterface[] = [
  {path: '/admin/issue/regi', label: '등록된 이슈'},
  {path: '/admin/issue/pending', label: '대기중 이슈'},
]

export const ComplainMenu: MenuInterface[] = [
  {path: '/admin/complaint/issue', label: '신고된 이슈'},
  {path: '/admin/complaint/post', label: '신고된 게시글'},
  {path: '/admin/complaint/reply', label: '신고된 댓글'},
  {path: '/admin/complaint/user', label: '신고된 유저'},
]

export const PopupMenu: MenuInterface[] = [
  {path: '/admin/notice/notice', label: '공지사항'},
  {path: '/admin/notice/issue-popup', label: '이슈 팝업'},
]

export const SettingMenu: MenuInterface[] = [
  {path: '/admin', label: '준비중1'},
  {path: '/admin', label: '준비중2'},
]

export const AdminMenuData: MenuInterface[] = [
  {path: '/admin/dashboard', label: '대시보드'},
  {path: '/admin/user', label: '회원관리'},
  {path: '/admin/issue', label: '이슈관리', child: IssueMenu},
  {path: '/admin/complaint', label: '신고관리', child: ComplainMenu},
  {path: '/admin/notice', label: '공지관리', child: PopupMenu},
  {path: '/admin/setting', label: '환경설정', child: SettingMenu},
  {path: '/', label: 'TOPIN'},
]
