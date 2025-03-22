import {style} from '@vanilla-extract/css'
import {adminBadge, adminColor, font} from '@/style/adminStyle.css'

const pageTapStyle = {
  body: style({

  }),
  list: {
    body: style({
      display: 'flex',
      flexDirection: 'row',
      gap: '.8rem'
    }),
    item: style({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    }),
    number: style({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '3rem',
      maxWidth: '3rem',
      border: '.1rem solid transparent',
      height: '3rem',
      cursor: 'pointer',
      borderRadius: '.4rem',
      font: font.l_lg,
      color: adminColor.gray_4,
      transition: 'border .3s, background .3s',
      selectors: {
        '&.active': {
          border: `.1rem solid ${adminBadge.blue.font}`,
          background: adminBadge.blue.background,
          color: adminBadge.blue.font,
        }
      }
    })
  }
}

export default pageTapStyle
