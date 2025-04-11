import {style} from '@vanilla-extract/css'
import {adminColor} from '@/style/adminStyle.css'

const AdminUserStyle = {
  main: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
  }),

  user: {
    status: style({
      position: 'absolute',
      zIndex: -1,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      selectors: {
        '&.active': {
          background: adminColor.green,
        },
        '&.banned': {
          background: adminColor.warningColor,
        },
        '&.deactivated': {
          background: adminColor.gray_6,
        },
      },
    }),
  },
}

export default AdminUserStyle
