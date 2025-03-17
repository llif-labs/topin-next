import {style} from '@vanilla-extract/css'
import {adminColor, adminFont} from '@/style/adminStyle.css'

export const header = {
  wrapper: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '.4rem',
    // borderBottom: `.1rem solid ${adminColor.borderColor}`,
    // padding: '0 0 1rem',
    margin: '0 0 2rem',
  }),
  label: style({
    font: adminFont.xlg,
    color: adminColor.blackFontColor,
  }),
}

export const breadcrumbs = {
  nav: style({
    display: 'flex',
    gap: '.8rem',
  }),
  span: style({
    fontSize: '1.1rem',
    color: adminColor.grayFontColor,
  }),
}
