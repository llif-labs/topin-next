import {style} from '@vanilla-extract/css'
import {adminColor, font} from '@/style/adminStyle.css'

export const filterHeight = '3.6rem'

export const filterStyle = {
  body: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '.8rem ',
  }),
  inner: style({
    display: 'flex',
    gap: '.8rem',
    position: 'relative',
    height: filterHeight,
  }),
  button: style({
    borderRadius: '.8rem',
    border: '.1rem solid ' + adminColor.gray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '.8rem',
    alignItems: 'center',
    font: font.n_md,
    padding: '1rem 1rem 1rem 1.5rem',
    color: adminColor.bk,
    cursor: 'pointer',
    transition: 'background .3s, color .3s, max-height .3s',
    selectors: {
      '&.active': {
        color: adminColor.white,
      },
    },
  })
}

export const filterSelect = {
  body: style({
    position: 'relative',
    display: 'inline-block',
    borderRadius: '.8rem',
    minWidth: '10rem',
    border: '.1rem solid ' + adminColor.gray,
    maxHeight: filterHeight,
    overflow: 'hidden',
    transition: 'background .3s, color .3s, max-height .3s',
    selectors: {
      '&.active': {
        background: adminColor.gray_5,
        maxHeight: '15rem',
      },
    },
  }),
  title: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '.8rem',
    alignItems: 'center',
    font: font.n_md,
    padding: '1rem 1rem 1rem 1.5rem',
    color: adminColor.bk,
    cursor: 'pointer',
    transition: 'background .3s, color .3s, max-height .3s',
    selectors: {
      '&.active': {
        color: adminColor.white,
      },
    },
  }),
  arrow: style({
    transition: 'transform 0.3s ease, stroke 0.3s ease', // stroke 전환 추가
    selectors: {
      '&.active': {
        transform: 'rotate(180deg)',
      },
    },
  }),
  list: {
    body: style({
      position: 'relative',
      zIndex: 2,
      display: 'inherit',
      width: '100%',
      maxHeight: '11.4rem',
      overflowY: 'scroll'
    }),
    item: style({
      gap: '.8rem',
      font: font.n_sm,
      padding: '1rem 1rem 1rem 1.5rem',
      color: adminColor.white,
      cursor: 'pointer',
      transition: 'background .3s',
      selectors: {
        '&:hover' : {
          background: adminColor.gray_6
        }
      }
    }),
  },
}

export const filterSearch = {
  body: style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '.4rem'
  }),
}
