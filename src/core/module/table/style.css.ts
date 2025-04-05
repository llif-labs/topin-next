import {globalStyle, style} from '@vanilla-extract/css'
import {adminColor, font} from '@/style/adminStyle.css'

export const page = {
  container: style({
    width: '100%',
  }),
  note: style({
    font: font.n_md,
    textAlign: 'right',
    color: adminColor.gray_2,
    padding: '1rem'
  }),
  table: style({
    border: `.1rem solid ${adminColor.borderColor}`,
    borderRadius: '1rem',
    overflow: 'hidden'
  })
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
  position: 'relative',
  color: adminColor.bk,
  padding: '1rem 2rem',
  font: font.n_md,
})

globalStyle(`${table.tbody} tr`, {
  cursor: 'pointer'
})

globalStyle(`${table.tbody} tr:not(:last-child)`, {
  borderBottom: `.1rem solid ${adminColor.borderColor}`,
})
