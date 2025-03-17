import {style} from '@vanilla-extract/css'

export const adminLayout = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  width: '100vw'
})

export const adminChildren = style({
  flex: 1,
  overflowY: 'scroll',
  padding: '1rem',
  maxHeight: '100vh'
})
