'use client'

import {useState} from 'react'
import {page, table} from '@/core/module/table/style.css' // 스타일 CSS 모듈
import {JSX} from 'react'

// 테이블 컴포넌트의 인터페이스 정의 (제네릭 T 사용)
interface TableInterface<T> {
  isChecked?: boolean; // 체크박스 여부 (기본값: true)
  thead: string[]; // 테이블 헤더 배열
  colGroup?: JSX.Element; // 열 너비 조정을 위한 colgroup (선택적)
  data: T[]; // 테이블 데이터 (제네릭 타입)
  render: (data: T) => JSX.Element; // 각 행을 렌더링하는 함수
  itemsPerPage?: number; // 페이지당 항목 수 (기본값: 5)
  currentPage?: number; // 현재 페이지 (외부에서 제어 가능)
  onPageChange?: (page: number) => void; // 페이지 변경 시 호출되는 콜백 (선택적)
}

// 테이블 컴포넌트 정의
const Table = <T, >({
                      isChecked = true,
                      thead = [],
                      colGroup,
                      data,
                      render,
                      itemsPerPage = 5,
                      currentPage: controlledPage,
                      onPageChange,
                    }: TableInterface<T>) => {
  // 내부 상태로 페이지 관리 (controlledPage가 없으면 자체 상태 사용)
  const [internalPage, setInternalPage] = useState(1)
  const currentPage = controlledPage !== undefined ? controlledPage : internalPage

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // 현재 페이지의 데이터 슬라이싱
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)

  // 페이지 이동 핸들러
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      if (onPageChange) onPageChange(newPage)
      else setInternalPage(newPage)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      if (onPageChange) onPageChange(newPage)
      else setInternalPage(newPage)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (onPageChange) onPageChange(page)
      else setInternalPage(page)
    }
  }

  return (
    <div className={page.container}>
      {/* 테이블 구조 */}
      <table className={table.wrapper}>
        {colGroup && colGroup} {/* 열 너비 설정용 colgroup */}
        <thead>
        <tr className={table.thead.tr}>
          {isChecked && (
            <td className={table.thead.td}>
              <input type="checkbox"/>
            </td>
          )}
          {thead.map((item, key) => (
            <td key={key} className={table.thead.td}>
              {item}
            </td>
          ))}
        </tr>
        </thead>
        <tbody className={table.tbody}>
        {currentData.length > 0 ? (
          currentData.map((item, index) => (
            <tr key={index}>
              {isChecked && ( <td className={table.thead.td}><input type="checkbox"/></td>)}
              {render(item)}
            </tr> // 각 행을 커스텀 렌더링
          ))
        ) : (
          <tr>
            <td colSpan={thead.length + (isChecked ? 1 : 0)}>
              데이터가 없습니다.
            </td>
          </tr>
        )}
        </tbody>
      </table>

      {/* 페이지네이션 컨트롤 */}
      {/*{data.length > 0 && (*/}
      {/*  <div className={page.pagination}>*/}
      {/*    <button*/}
      {/*      onClick={goToPrevPage}*/}
      {/*      disabled={currentPage === 1}*/}
      {/*      className={table.paginationButton}*/}
      {/*    >*/}
      {/*      이전*/}
      {/*    </button>*/}

      {/*    /!* 페이지 번호 버튼 *!/*/}
      {/*    {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (*/}
      {/*      <button*/}
      {/*        key={page}*/}
      {/*        onClick={() => goToPage(page)}*/}
      {/*        className={`${table.paginationButton} ${*/}
      {/*          currentPage === page ? table.activePage : ''*/}
      {/*        }`}*/}
      {/*      >*/}
      {/*        {page}*/}
      {/*      </button>*/}
      {/*    ))}*/}

      {/*    <button*/}
      {/*      onClick={goToNextPage}*/}
      {/*      disabled={currentPage === totalPages}*/}
      {/*      className={table.paginationButton}*/}
      {/*    >*/}
      {/*      다음*/}
      {/*    </button>*/}

      {/*    <span className={table.pageInfo}>*/}
      {/*      {totalPages} 중 {currentPage} 페이지*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default Table
