import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  fontFamily: 'Pretendard',
  fontSize: '10px',
  padding: 0,
  margin: 0,
});

globalStyle('*', {
  color: '#111827',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  textDecoration: 'none'
})

globalStyle('button', {
  background: 'transparent',
  font: '500 1.4rem "Pretendard", sans-serif',
  letterSpacing: '-0.02em',
  border: 'none',
  appearance: 'none',
})

globalStyle('::-webkit-scrollbar', {
  display: 'none'
})

globalStyle('h1, h2, h3, h4, h5, h6, p, a', {
  padding: 0,
  margin: 0,
})

globalStyle('h1', {
  font: '700 3.6rem "Pretendard", sans-serif'
})

globalStyle('h2', {
  font: '500 3.6rem "Pretendard", sans-serif'
})

globalStyle('h3', {
  font: '700 2.4rem "Pretendard", sans-serif'
})

globalStyle('h4', {
  font: '500 2.4rem "Pretendard", sans-serif'
})

globalStyle('h5', {
  font: '700 1.6rem "Pretendard", sans-serif'
})

globalStyle('h6', {
  font: '500 1.6rem "Pretendard", sans-serif'
})

globalStyle('p.title', {
  font: '700 1.8rem "Pretendard", sans-serif',
  letterSpacing: '-0.02em'
})

globalStyle('p.sub', {
  font: '500 1.6rem "Pretendard", sans-serif',
  letterSpacing: '-0.02em'
})

globalStyle('li.menu', {
  font: '500 1.8rem "Pretendard", sans-serif',
  letterSpacing: '-0.02em'
})

globalStyle('li.sub', {
  font: '500 1.4rem "Pretendard", sans-serif',
  letterSpacing: '-0.02em'
})
