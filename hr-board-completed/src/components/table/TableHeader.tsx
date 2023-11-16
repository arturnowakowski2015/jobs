export type Header = {
  id: string;
  label: React.ReactNode;
};

type Props = {
  headers: Header[];
};

export const TableHeader = ({ headers }: Props) => {
  return (
    <tr className="bg-gray-200 text-left">
      {headers.map((header) => {
        return (
          <th key={header.id} className="p-1 text-sm">
            {header.label}
          </th>
        );
      })}
    </tr>
  );
};
