import {globalFontFace} from '@vanilla-extract/css'

const pretendard = 'Pretendard'

globalFontFace(pretendard, [
  {
    src: 'url("/assets/font/Pretendard-Black.woff")',
    fontWeight: 900
  },
  {
    src: 'url("/assets/font/Pretendard-ExtraBold.woff")',
    fontWeight: 800
  },
  {
    src: 'url("/assets/font/Pretendard-Bold.woff")',
    fontWeight: 700
  },
  {
    src: 'url("/assets/font/Pretendard-SemiBold.woff")',
    fontWeight: 600
  },
  {
    src: 'url("/assets/font/Pretendard-Medium.woff")',
    fontWeight: 500
  },
  {
    src: 'url("/assets/font/Pretendard-Regular.woff")',
    fontWeight: 400
  },
  {
    src: 'url("/assets/font/Pretendard-Light.woff")',
    fontWeight: 300
  },
  {
    src: 'url("/assets/font/Pretendard-ExtraLight.woff")',
    fontWeight: 200
  },
  {
    src: 'url("/assets/font/Pretendard-Thin.woff")',
    fontWeight: 100
  },
])
