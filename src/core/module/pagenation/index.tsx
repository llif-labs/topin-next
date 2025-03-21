import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 현재 페이지를 기준으로 표시할 범위 계산
  let startPage = Math.max(1, currentPage - 4); // 이전 4페이지
  let endPage = Math.min(totalPages, currentPage + 5); // 이후 5페이지

  // 총 10페이지를 고정으로 표시하도록 계산
  if (endPage - startPage < 9) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 9); // 1번부터 시작할 때는 10페이지까지 보여줌
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - 9); // 끝에서 10개 페이지를 보여줌
    }
  }

  // 범위 내 페이지들 계산
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const handleClick = (page: number) => {
    onPageChange(page); // 페이지 변경 시 호출되는 콜백 함수
  };

  return (
    <div>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        {pageNumbers.map((page) => (
          <li key={page} style={{ margin: '0 5px' }}>
            <button
              onClick={() => handleClick(page)}
              disabled={currentPage === page}
              style={{
                padding: '5px 10px',
                backgroundColor: currentPage === page ? '#4CAF50' : '#f0f0f0',
                border: '1px solid #ccc',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
