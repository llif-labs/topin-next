import {style} from '@vanilla-extract/css'

export const adminLayout = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  width: '100vw'
})

export const adminChildren = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflowY: 'scroll',
  padding: '2rem 2rem',
  maxHeight: '100vh'
})
