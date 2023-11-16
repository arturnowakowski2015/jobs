import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

import { TableCell } from './TableCell';
import { TableRow } from './TableRow';

type Props = {
  goToPrevPage: () => void;
  goToNextPage: () => void;
  currentPageNumber: number;
  totalPagesCount: number;
};

export const TablePagination = ({
  currentPageNumber,
  goToPrevPage,
  goToNextPage,
  totalPagesCount,
}: Props) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex w-full items-center justify-center space-x-2 p-2">
          {currentPageNumber > 1 && (
            <button
              className="h-10 w-10 rounded-full p-2 hover:scale-125"
              onClick={goToPrevPage}
            >
              <ArrowLeftIcon />
              {'  '}
            </button>
          )}
          <p>
            {currentPageNumber} / {totalPagesCount}
          </p>
          {currentPageNumber < totalPagesCount && (
            <button
              className="h-10 w-10 rounded-full p-2 hover:scale-125"
              onClick={goToNextPage}
            >
              {'  '}
              <ArrowRightIcon />
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
