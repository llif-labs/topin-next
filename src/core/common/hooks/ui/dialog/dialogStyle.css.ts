import {style} from '@vanilla-extract/css'
import {adminColor} from '@/style/adminStyle.css'

export const dialogStyle = {
  bg: style({
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, .25)',
  }),
  body: {
    wrapper: style({
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      position: 'relative',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1.2rem',
      padding: '5rem',
      maxWidth: '30rem',
      background: 'white',
    }),
    content: style({
      display: 'flex',
      flexDirection: 'column'
    })
  },
  button: {
    body: style({
      display: 'flex',
      flexDirection: 'row',
      gap: '.8rem',
    }),
    cancel: style({
      flex: '1',
      background: adminColor.gray_6,
      color: adminColor.white,
      borderRadius: '.8rem',
      padding: '1rem 1rem',
      transition: 'background .3s',
      cursor:'pointer',
      selectors: {
        '&:hover' : {
          background: adminColor.gray_3,
        }
      }
    }),
    confirm: style({
      flex: '1',
      background: adminColor.warningColor,
      color: adminColor.white,
      borderRadius: '.8rem',
      padding: '1rem 1rem',
      transition: 'background .3s',
      cursor:'pointer',
      selectors: {
        '&:hover' : {
          background: adminColor.activeFontColor,
        }
      }
    }),
    choice: style({
      flex: '1',
      background: adminColor.green_2,
      color: adminColor.white,
      borderRadius: '.8rem',
      padding: '1rem 1rem',
      transition: 'background .3s',
      cursor:'pointer',
      selectors: {
        '&:hover' : {
          background: adminColor.green,
        }
      }
    }),
  },
}
