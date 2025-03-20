import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { adminColor, font } from '@/style/adminStyle.css'

// 수정된 spin 애니메이션
const spin = keyframes({
  '0%': {
    transform: 'translate(-50%, -50%) rotate(0deg)',
  },
  '100%': {
    transform: 'translate(-50%, -50%) rotate(360deg)',
  },
})

export const login = style({
  position: 'relative',
  width: '34rem',
  height: 'auto',
  borderRadius: '.4rem',
  background: '#FFFFFF',
  overflow: 'hidden',
})

export const slider = {
  inner: {
    wrapper: style({
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: 'auto',
      transition: 'left .3s',
      left: '0%',
    }),
    content: style({
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5rem',
      padding: '6rem 2rem 8rem',
    }),
  },
}

export const loginTitle = {
  wrapper: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '.8rem',
    textAlign: 'center',
  }),
  title: style({
    color: adminColor.bk,
  }),
  sub: style({
    font: font.n_sm,
    lineHeight: '150% !important',
    color: adminColor.gray_3,
  }),
}

export const buttonWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  marginTop: '2rem',
})

export const prev = style({
  flex: 1,
  background: adminColor.gray_3,
  padding: '1rem 0',
  borderRadius: '.4rem',
  color: adminColor.white,
  cursor: 'pointer',
})
export const submit = style({
  position: 'relative',
  flex: 2,
  background: adminColor.green,
  padding: '1rem 0',
  borderRadius: '.4rem',
  color: adminColor.white,
  cursor: 'pointer',
  textAlign: 'center',
  height: '3.7rem',
  transition: 'background .2s',
  selectors: {
    '&:disabled' : {
      background: adminColor.gray,
    }
  }
})

export const spinner = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '16px',
  height: '16px',
  border: '2px solid #FFFFFF',
  borderTop: '2px solid transparent',
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`, // 애니메이션 정의가 제대로 되었는지 확인
})

globalStyle('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
})

globalStyle(`input[name="login-radio"]`, {
  display: 'none',
})

globalStyle(`input[name="login-radio"]:nth-child(1):checked ~  ${slider.inner.wrapper}`, {
  left: '0%',
})

globalStyle(`input[name="login-radio"]:nth-child(2):checked ~  ${slider.inner.wrapper}`, {
  left: '-100%',
})
