import { useState } from 'react';

// type SelectedData = {
//   selected: string[];
//   toggleMultipleSelect: (items: string[]) => void;
//   toggleOne: (item: string) => void;
//   clearSelected: () => void;
//   areAllDataSelected: boolean;
//   areAllDataOnPageSelected: boolean;
//   isSomeItemOnCurrentPageSelected: boolean;
//   areSomeItemsSelectedButNotAll: boolean;
// };

export const useSelectedData = (
  dataIds: string[],
  currentPageDataIds: string[],
) => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleOne = (itemId: string) => {
    if (selected.includes(itemId)) {
      setSelected(
        selected.filter((id) => {
          return id !== itemId;
        }),
      );
    } else {
      setSelected([...selected, itemId]);
    }
  };

  const clearSelected = () => {
    setSelected([]);
  };

  const toggleMultipleSelect = (itemIds: string[]) => {
    const unselect = itemIds.every((itemId) => {
      return selected.includes(itemId);
    });
    if (unselect) {
      setSelected(
        selected.filter((id) => {
          return !itemIds.includes(id);
        }),
      );
    } else {
      const additemIds = itemIds.filter((id) => {
        return !selected.includes(id);
      });
      setSelected([...selected, ...additemIds]);
    }
  };

  const areAllDataSelected = dataIds.every((itemId) => {
    return selected.includes(itemId);
  });
  const areAllDataOnPageSelected = currentPageDataIds.every((itemId) => {
    return selected.includes(itemId);
  });
  const isSomeItemOnCurrentPageSelected = currentPageDataIds.some((itemId) => {
    return selected.includes(itemId);
  });
  const areSomeItemsSelectedButNotAll =
    isSomeItemOnCurrentPageSelected && !areAllDataOnPageSelected;

  return {
    selected,
    toggleMultipleSelect,
    toggleOne,
    clearSelected,
    areAllDataSelected,
    areAllDataOnPageSelected,
    isSomeItemOnCurrentPageSelected,
    areSomeItemsSelectedButNotAll,
  };
};
