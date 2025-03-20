import {style} from '@vanilla-extract/css'
import {adminColor} from '@/style/adminStyle.css'

const dayTap = {
  wrapper: style({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '.8rem',
    overflow: 'hidden',
    alignSelf: 'flex-start',
    border: `.1rem solid ${adminColor.borderColor}`,
  }),
  item: style({
    font: '400 1.2rem "Pretendard", sans-serif',
    padding: '.5rem 1rem',
    color: adminColor.gray_2,
    background: adminColor.white,
    cursor: 'pointer',
    transition: 'color .3s, background .3s',
    selectors: {
      ['&.active']: {
        color: adminColor.blackFontColor,
        background: adminColor.activeBackground,
      },
    },
  }),
}

export default dayTap
