import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';

type Props<T> = {
  data: T[];
  renderRow: (item: T) => JSX.Element;
  header: React.ReactNode;
  footer: React.ReactNode;
};

export const Table = <T,>({ data, renderRow, header, footer }: Props<T>) => {
  const rows = data.map((item) => {
    return renderRow(item);
  });

  return (
    <table className="w-full">
      <thead>{header}</thead>
      <tbody>{rows}</tbody>
      <tfoot>{footer}</tfoot>
    </table>
  );
};

Table.Cell = TableCell;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Pagination = TablePagination;
