import { useEffect, useState } from 'react';

type FilteredData<T> = {
  filteredData: T[];
};

export const useFilteredData = <T extends object, K extends keyof T>(
  items: T[],
  compareField: K,
  compareValue: string,
): FilteredData<T> => {
  const [filteredData, setFilteredData] = useState<Array<T>>([]);
  useEffect(() => {
    setFilteredData(
      items.filter((item) => {
        const filteredValue = item[compareField] as string;
        return filteredValue.toLowerCase().includes(compareValue);
      }),
    );
  }, [items, compareField, compareValue]);

  return { filteredData };
};
