import {globalStyle, style} from '@vanilla-extract/css'

export const adminMenu = style({
  flex: 1,
  display: 'flex',
  padding: '1rem',
  maxWidth: '20rem',
  borderRight: '.1rem solid #eee'
})

export const menuList = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '.8rem',
})

export const menuItem = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})

export const checkbox = style({ display: 'none' })
export const menuLabel = style({
  font: '500 1.4rem "Pretendard", sans-serif',
  letterSpacing: '-0.02em',
  cursor: 'pointer',
})

export const list = style({
  maxHeight: '0rem',
  overflow: 'hidden',
  transition: 'max-height .3s'
})

globalStyle(`${checkbox}:checked ~ ${list}`, {
  maxHeight: '10rem'
})
