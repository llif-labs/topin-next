import {style} from '@vanilla-extract/css'
import {adminBadge, adminColor, adminFont} from '@/style/adminStyle.css'

const changeValue = (color: string) => style({
  color: color,
  fontWeight: 600
})

const createBadge = (color: string, bg: string) => style({
  display: 'inline-block',
  padding: '.2rem .6rem',
  font: '400 1rem "Pretendard", sans-serif',
  color: color,
  border: `.1rem solid ${color}`,
  borderRadius: '5rem',
  background: bg
})

const box = {
  list: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '1.2rem',
  }),
  content: {
    item: style({
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      minWidth: '30rem',
      padding: '2rem',
      borderRadius: '.8rem',
      border: `.1rem solid ${adminColor.borderColor}`,
    }),

    left: style({
      display: 'flex',
      flexDirection: 'column',
      gap: '.6rem',
    }),
    title: style({
      font: adminFont.xsm,
      color: adminColor.grayFontColor,
    }),
    value: style({
      font: adminFont.lg,
      color: adminColor.blackFontColor,
    }),
    change: {
      increase: changeValue(adminBadge.green.font),
      decrease: changeValue(adminBadge.red.font),
      text: style({
        font: adminFont.xsm,
        color: adminColor.grayFontColor,
      }),
    },

    badge: {
      increase: createBadge(adminBadge.green.font, adminBadge.green.background),
      decrease: createBadge(adminBadge.red.font, adminBadge.red.background),
    }
  },
}

export default box
