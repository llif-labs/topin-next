export interface MenuInterface {
  path: string
  label: string
  child?: MenuInterface[]
}

export const IssueChild: MenuInterface[] = [
  {path: `/admin/content/issue/detail/[id]`, label: '이슈 상세'}
]

export const IssueMenu: MenuInterface[] = [
  {path: '/admin/content/issue', label: '이슈', child: IssueChild},
]

export const ComplainMenu: MenuInterface[] = [
  {path: '/admin/content/report/post', label: '신고된 게시글'},
  {path: '/admin/content/report/reply', label: '신고된 댓글'},
  {path: '/admin/content/report/user', label: '신고된 유저'},
]

export const PopupMenu: MenuInterface[] = [
  {path: '/admin/content/notice/notice', label: '공지사항'},
  {path: '/admin/content/notice/issue-popup', label: '이슈 팝업'},
]

export const SettingMenu: MenuInterface[] = [
  {path: '/admin', label: '준비중1'},
  {path: '/admin', label: '준비중2'},
]

export const AdminMenuData: MenuInterface[] = [
  {path: '/admin/content/dashboard', label: '대시보드'},
  {path: '/admin/content/user', label: '회원관리'},
  {path: '/admin/content/issue', label: '이슈관리', child: IssueMenu},
  {path: '/admin/content/report', label: '신고관리', child: ComplainMenu},
  {path: '/admin/content/notice', label: '공지관리', child: PopupMenu},
  {path: '/admin/content/setting', label: '환경설정', child: SettingMenu},
  {path: '/', label: 'TOPIN'},
]
