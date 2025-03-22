import React, {useEffect, useState} from 'react'
import pageTapStyle from '@/core/module/pagenation/style.css'
import SvgIcon from '@/core/module/svgIcon'

interface PaginationProps {
  currentPage: number;
  size: number;
  totalItem: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, size, totalItem, onPageChange}) => {

  const [p, setP] = useState<number>(currentPage)
  const totalPage = Math.ceil(Number(totalItem) / size)

  // 현재 페이지를 기준으로 표시할 범위 계산
  let startPage = Math.max(1, currentPage - 4) // 이전 4페이지
  let endPage = Math.min(totalPage, currentPage + 5) // 이후 5페이지


  // 총 10페이지를 고정으로 표시하도록 계산
  if (endPage - startPage < 9) {
    if (startPage === 1) {
      endPage = Math.min(totalPage, startPage + 9) // 1번부터 시작할 때는 10페이지까지 보여줌
    } else if (endPage === totalPage) {
      startPage = Math.max(1, totalPage - 9) // 끝에서 10개 페이지를 보여줌
    }
  }

  // 범위 내 페이지들 계산
  const pageNumbers = Array.from({length: endPage - startPage + 10}, (_, index) => startPage + index)

  const handleClick = (page: number) => {
    setP(page)
  }

  const handleChangePage = (page: number) => {
    const num = p + page
    if (num < 0) return
    setP(num)
  }

  useEffect(() => {
    onPageChange(p)
  }, [p])

  return (
    <div className={pageTapStyle.body}>
      <ul className={pageTapStyle.list.body}>
        {
          pageNumbers.length > 1 && <li className={pageTapStyle.list.item} onClick={() => handleChangePage(-1)}>
            <SvgIcon src={'/assets/svg/icon/arrow-left-icon.svg'} stroke={currentPage == 1 ? '#D9DEE1' : '#2F3033'} size={18}/>
          </li>
        }
        {pageNumbers.length > 1 && pageNumbers.map((page) => (
          <li key={page} className={pageTapStyle.list.item}>
            <button onClick={() => handleClick(page)}>
              <p className={`${pageTapStyle.list.number} ${currentPage === page ? 'active' : ''}`}>
                {page}
              </p>
            </button>
          </li>
        ))}
        {
          pageNumbers.length > 1 && <li className={pageTapStyle.list.item} onClick={() => handleChangePage(1)}>
            <SvgIcon src={'/assets/svg/icon/arrow-right-icon.svg'} stroke={currentPage == pageNumbers.length ? '#D9DEE1' : '#2F3033'} size={18}/>
          </li>
        }
      </ul>
    </div>
  )
}

export default Pagination
