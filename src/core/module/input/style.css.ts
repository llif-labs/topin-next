import {globalStyle, style} from '@vanilla-extract/css'
import {adminColor, font} from '@/style/adminStyle.css'

const frame = '.2s'

const inputText = {
  wrapper: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '.4rem',
    width: '30rem',
    padding: '1rem 0',
    maxHeight: '3.5rem',
    overflow: 'hidden',
    transition: `max-height ${frame}`,
    selectors: {
      '&.active': {
        maxHeight: '5rem',
      },
    },
  }),
  box: {
    wrapper: style({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }),
    label: style({
      position: 'absolute',
      top: '50%',
      left: '1.5rem',
      transform: 'translateY(-50%)',
      background: '#FFFFFF',
      color: adminColor.gray,
      font: font.b_md,
      padding: '0 .5rem',
      transition: `top ${frame}, left ${frame}, transform ${frame}, font ${frame}, color ${frame}`,
      selectors: {
        '&.active': {
          top: '-.5rem',
          left: '1rem',
          transform: 'translateY(0)',
          font: font.n_sm,
        },
      },
    }),
    input: style({
      color: adminColor.bk,
      borderRadius: '.4rem',
      border: '.1rem solid #DDDDDD',
      padding: '1.3rem 1.6rem',
    }),
  },
  warning: style({
    padding: '0 .5rem 0',
    font: font.n_sm,
    color: adminColor.warningColor,
    opacity: 0,
    transition: `opacity .5s`,
    selectors: {
      '&.active': {
        opacity: 1,
      },
    },
  }),
}

globalStyle(`
${inputText.box.input}:focus ~ ${inputText.box.label}`, {
  top: '-.5rem',
  left: '1rem',
  transform: 'translateY(0)',
  font: font.n_sm,
})

export default inputText
