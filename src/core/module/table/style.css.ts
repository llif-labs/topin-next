import {globalStyle, style} from '@vanilla-extract/css'
import {adminColor, font, tableColor} from '@/style/adminStyle.css'

export const page = {
  container: style({
    width: '100%',
    border: `.1rem solid ${adminColor.borderColor}`,
    borderRadius: '1rem',
    overflow: 'hidden'
  }),
}

export const table = {
  wrapper: style({
    width: '100%',
    borderCollapse: 'collapse',
  }),
  thead: {
    tr: style({
      background: adminColor.borderColor,
    }),
    td: style({
      color: adminColor.gray_4,
      padding: '1rem 2rem',
      font: font.b_md,
    }),
  },
  tbody: style({}),
  empty: style({
    textAlign: 'center',
    padding: '10rem 0'
  })
}


globalStyle(`${table.tbody} tr td`, {
  color: adminColor.bk,
  padding: '1rem 2rem',
  font: font.n_md,
})

globalStyle(`${table.tbody} tr:not(:last-child)`, {
  borderBottom: `.1rem solid ${adminColor.borderColor}`,
})
