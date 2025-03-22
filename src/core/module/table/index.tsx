import {page, table} from '@/core/module/table/style.css' // 스타일 CSS 모듈
import {JSX} from 'react'

// 테이블 컴포넌트의 인터페이스 정의 (제네릭 T 사용)
interface TableInterface<T> {
  isChecked?: boolean; // 체크박스 여부 (기본값: true)
  note?: string; // 체크박스 여부 (기본값: true)
  thead: string[]; // 테이블 헤더 배열
  colGroup?: JSX.Element; // 열 너비 조정을 위한 colgroup (선택적)
  data: T[]; // 테이블 데이터 (제네릭 타입)
  render: (data: T) => JSX.Element; // 각 행을 렌더링하는 함수
}

const Table = <T, >({
                      isChecked = true,
                      note = '',
                      thead = [],
                      colGroup,
                      data,
                      render,
                    }: TableInterface<T>) => {
  return (
    <div className={page.container}>
      {/* 테이블 구조 */}
      <p className={page.note}>{note}</p>
      <div className={page.table}>
        <table className={table.wrapper}>
          {colGroup ? colGroup : null}
          <thead>
          <tr className={table.thead.tr}>
            {isChecked ? (
              <td className={table.thead.td}>
                <input type="checkbox"/>
              </td>
            ) : null}
            {thead.map((item, key) => (
              <td key={key} className={table.thead.td}>
                {item}
              </td>
            ))}
          </tr>
          </thead>
          <tbody className={table.tbody}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {isChecked ? <td className={table.thead.td}><input type="checkbox"/></td> : null}
                {render(item)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={thead.length + (isChecked ? 1 : 0)}>
                <p className={table.empty}>데이터가 없습니다. </p>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
