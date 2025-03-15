import {globalFontFace} from '@vanilla-extract/css'

const pretendard = 'Pretendard'

globalFontFace(pretendard, [
  {
    src: 'url("/font/Pretendard-Black.woff")',
    fontWeight: 900
  },
  {
    src: 'url("/font/Pretendard-Bold.woff")',
    fontWeight: 800
  },
  {
    src: 'url("/font/Pretendard-ExtraBold.woff")',
    fontWeight: 700
  },
  {
    src: 'url("/font/Pretendard-ExtraLight.woff")',
    fontWeight: 600
  },
  {
    src: 'url("/font/Pretendard-Light.woff")',
    fontWeight: 500
  },
  {
    src: 'url("/font/Pretendard-Medium.woff")',
    fontWeight: 400
  },
  {
    src: 'url("/font/Pretendard-Regular.woff")',
    fontWeight: 300
  },
  {
    src: 'url("/font/Pretendard-SemiBold.woff")',
    fontWeight: 200
  },
  {
    src: 'url("/font/Pretendard-Thin.woff")',
    fontWeight: 100
  },
])
