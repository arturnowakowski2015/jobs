import { useState } from 'react';

export type PaginatedData<T> = {
  goToPrevPage: () => void;
  goToNextPage: () => void;
  goToFirstPage: () => void;
  currentPageData: T[];
  currentPageNumber: number;
  totalPagesCount: number;
};

export const usePaginatedData = <T>(data: T[]): PaginatedData<T> => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPagesCount = Math.ceil(data.length / itemsPerPage);

  const goToPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber(currentPageNumber - 1);
  };
  const goToNextPage = () => {
    if (currentPageNumber === totalPagesCount) return;
    setCurrentPageNumber(currentPageNumber + 1);
  };
  const goToFirstPage = () => {
    setCurrentPageNumber(1);
  };

  const firstItem = (currentPageNumber - 1) * itemsPerPage;
  const currentPageData = data.slice(firstItem, firstItem + itemsPerPage);

  return {
    goToPrevPage,
    goToNextPage,
    goToFirstPage,
    currentPageData,
    currentPageNumber,
    totalPagesCount,
  };
};
