import {style} from '@vanilla-extract/css'
import {adminColor} from '@/style/adminStyle.css'


const dashboard = {
  wrapper: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  }),
  title: style({
    font: '700 4rem "Pretendard", sans-serif',
    color: adminColor.blackFontColor,
  }),
  box: {
    list: style({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '1.2rem',
    }),
  },
}

export default dashboard
