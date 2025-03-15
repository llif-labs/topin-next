import {style} from '@vanilla-extract/css'

export const layout = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  maxWidth: '140rem',
  height: '100vh',
  margin: '0 auto',
  background: "#DDD",
})

export const mainBody = style({
  flex: 2,
  overflowY: 'scroll'
})

export const sideInfo = style({
  flex: 1,
  borderLeft: '.1rem solid #eee'
})
