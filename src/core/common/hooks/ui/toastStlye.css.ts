import {keyframes, style} from '@vanilla-extract/css'
import {font, ToastColor} from '@/style/adminStyle.css'

// 수정된 spin 애니메이션
const slidIn = keyframes({
  '0%': {
    transform: 'translateX(100%)',
    opacity: '0',
  },
  '100%': {
    transform: 'translateX(0%)',
    opacity: '1',
  },
})

const toastStyle = {
  list: {
    body: style({
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      right: '2rem',
      bottom: '2rem',
    }),
    item: style({
      display: 'flex',
      gap: '.8rem',
      alignItems: 'center',
      padding: '1.25rem 2rem',
      minWidth: '30rem',
      borderRadius: '.8rem',
      font: font.n_lg,
      animation: `${slidIn} 0.3s ease`,
      selectors: {
        '&.warning': {
          border: `.1rem solid ${ToastColor.warning.stroke}`,
          background: ToastColor.warning.background,
          color: ToastColor.warning.color,
        },
        '&.info': {
          border: `.1rem solid ${ToastColor.info.stroke}`,
          background: ToastColor.info.background,
          color: ToastColor.info.color,
        },
      },
    }),
  },
}


export default toastStyle
