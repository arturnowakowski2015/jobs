import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  const changeDebouncedValue = useCallback((input: string) => {
    setDebouncedSearchValue(input);
  }, []);

  const debouncedChangeSearchValue = useMemo(() => {
    return debounce(changeDebouncedValue, 300);
  }, [changeDebouncedValue]);

  const changeSearchValue = (queryText: string) => {
    if (queryText.length > 2) {
      debouncedChangeSearchValue(queryText);
    } else {
      debouncedChangeSearchValue('');
    }
    setSearchValue(queryText);
  };
  return { searchValue, debouncedSearchValue, changeSearchValue };
};
