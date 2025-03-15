import {style} from '@vanilla-extract/css'

export const header = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem'
})

export const headerAuth = style({
  display: 'flex',
  alignItems: 'center',
})

export const authButton = style({
  whiteSpace: 'nowrap',

})
