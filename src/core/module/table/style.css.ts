import {globalStyle, style} from '@vanilla-extract/css'
import {adminColor, adminFont, tableColor} from '@/style/adminStyle.css'

export const page = {
  container: style({
    width: '100%',
  }),
}

export const table = {
  wrapper: style({
    borderCollapse: 'collapse',
  }),
  thead: {
    tr: style({
      background: tableColor.bgColor,
    }),
    td: style({
      color: adminColor.grayFontColor,
      padding: '1rem 2rem',
      font: adminFont.xxsm,
    }),
  },
  tbody: style({}),
}


globalStyle(`${table.tbody} tr td`, {
  color: adminColor.blackFontColor,
  padding: '1rem 2rem',
  font: adminFont.xxsm,
})
