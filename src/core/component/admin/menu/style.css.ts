import {style} from '@vanilla-extract/css'
import {adminColor} from '@/style/adminStyle.css'

export const adminMenu = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 2rem',
  maxWidth: '20rem',
  background: adminColor.backgroundColor,
})

export const adminHeader = style({
  font: '700 2rem "Pretendard", sans-serif',
  color: adminColor.basicFontColor,
  padding: '2rem 0 4rem',
})

export const adminListWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
})

export const adminMenuList = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '.8rem',
  selectors: {
    '&:not(:last-child)::before': {
      position: 'absolute',
      content: '',
      bottom: '-1.5rem',
      left: 0,
      width: '100%',
      height: '.1rem',
      background: adminColor.gray_4,
    },
  },
})

export const category = style({
  font: '700 1.3rem "Pretendard", sans-serif',
  color: adminColor.gray_4,
})

export const label = style({
  font: '500 1.6rem "Pretendard", sans-serif',
  color: adminColor.basicFontColor,
  transition: 'color .3s',
  selectors: {
    [`&.active`]: {
      color: adminColor.activeFontColor,
    },
    [`&:hover`]: {
      color: adminColor.activeFontColor,
    },
  },
})

export const adminButtonWrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  color: adminColor.basicFontColor,
  gap: '.8rem',
  padding: '0 0 2rem',
})

export const adminButton = style({
  color: adminColor.basicFontColor,
  width: '100%',
  font: '500 1.3rem "Pretendard", sans-serif',
  cursor: 'pointer'
})
