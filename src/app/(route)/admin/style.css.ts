import {style} from '@vanilla-extract/css'

export const adminLayout = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw'
})

export const adminContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
})

export const adminChildren = style({
  flex: 1,
  overflowY: 'scroll',
  padding: '1rem',
  maxHeight: 'calc(100vh - (5.1rem + 3.3rem))'
})
