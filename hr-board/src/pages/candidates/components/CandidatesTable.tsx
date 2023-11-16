import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

import { CANDIDATES_QUERY_KEY } from 'constants/constants';
import { formatDateCreatedAt } from 'utils/formatDateCreatedAt';
import { candidatesService, type Candidate } from 'services/candidatesService';
import { Table } from 'components/table/Table';
import { Checkbox } from 'components/checkbox/Checkbox';
import { FilterInput } from 'components/input/FilterInput';
import { ActionsMenu, type Action } from 'components/menu/ActionsMenu';
import type { Header } from 'components/table/TableHeader';
import { LinkButton } from 'components/buttons';
import { usePaginatedData } from 'hooks/usePaginatedData';
import { useSelectedData } from 'hooks/useSelectedData';
import { useSearch } from 'hooks/useSearch';
import { useFilteredData } from 'hooks/useFilteredData';

type Props = {
  candidates: Candidate[];
};

export const CandidatesTable = ({ candidates }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteRow } = useMutation({
    mutationFn: candidatesService.deleteOne,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: CANDIDATES_QUERY_KEY });
      const previousCandidates = queryClient.getQueryData(CANDIDATES_QUERY_KEY);
      queryClient.setQueryData<Array<Candidate>>(
        CANDIDATES_QUERY_KEY,
        (oldData) => {
          return oldData?.filter((data) => {
            return data.id !== id;
          });
        },
      );
      return { previousCandidates };
    },
    onSuccess: () => {
      toast('Candidate successfully deleted');
    },
    onError: (err, id, context) => {
      toast.warn('Could not delete candidate');
      queryClient.setQueryData(
        CANDIDATES_QUERY_KEY,
        context?.previousCandidates,
      );
    },
  });

  const { mutate: deleteRows } = useMutation({
    mutationFn: candidatesService.deleteMany,
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: CANDIDATES_QUERY_KEY });
      const previousCandidates = queryClient.getQueryData(CANDIDATES_QUERY_KEY);
      queryClient.setQueryData<Array<Candidate>>(
        CANDIDATES_QUERY_KEY,
        (oldData) => {
          return oldData?.filter((data) => {
            return !ids.includes(data.id);
          });
        },
      );
      return { previousCandidates };
    },
    onSuccess: () => {
      toast('Candidates successfully deleted');
    },
    onError: (err, ids, context) => {
      toast.warn('Could not delete these candidates');
      queryClient.setQueryData(
        CANDIDATES_QUERY_KEY,
        context?.previousCandidates,
      );
    },
  });

  const search = useSearch();
  const { filteredData } = useFilteredData(
    candidates,
    'name',
    search.debouncedSearchValue?.toLowerCase(),
  );

  const pagination = usePaginatedData(filteredData);

  const selectedData = useSelectedData(
    filteredData.map((item) => {
      return item.id;
    }),
    pagination.currentPageData.map((item) => {
      return item.id;
    }),
  );

  const handleChangeFilter = (input: string) => {
    search.changeSearchValue(input);
    pagination.goToFirstPage();
    selectedData.clearSelected();
  };
  const headers: Header[] = [
    {
      id: 'select',
      label: (
        <Checkbox
          onChange={() => {
            selectedData.toggleMultipleSelect(
              pagination.currentPageData.map((item) => {
                return item.id;
              }),
            );
          }}
          isChecked={selectedData.isSomeItemOnCurrentPageSelected}
          isPartialyChecked={selectedData.areSomeItemsSelectedButNotAll}
        />
      ),
    },
    { id: 'name', label: 'Candidate Name' },
    { id: 'date', label: 'Date' },
    { id: 'position', label: 'Position' },
    { id: 'actions', label: 'Actions' },
  ];

  const renderCandidatesRow = (candidate: Candidate) => {
    const isSelected = selectedData.selected.includes(candidate.id);
    return (
      <Table.Row key={candidate.id}>
        <Table.Cell>
          <Checkbox
            onChange={() => {
              selectedData.toggleOne(candidate.id);
            }}
            isChecked={isSelected}
          />
        </Table.Cell>
        <Table.Cell>{candidate.name}</Table.Cell>
        <Table.Cell>{formatDateCreatedAt(candidate.createdAt)}</Table.Cell>
        <Table.Cell>{candidate.position}</Table.Cell>
        <Table.Cell>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                deleteRow(candidate.id);
              }}
            >
              {'  '}
              <TrashIcon className="h-5 w-5 hover:scale-125" />
            </button>
            <NavLink to={`/candidates/${candidate.id}`}>
              <EyeIcon className="h-5 w-5 hover:scale-125" />
            </NavLink>
          </div>
        </Table.Cell>
      </Table.Row>
    );
  };

  const MENU_ACTIONS: Action[] = [
    {
      name: 'Delete',
      action: (ids: string[]) => {
        deleteRows(ids);
      },
    },
  ];

  return (
    <>
      <div className="flex items-center  space-x-2 p-2">
        <ActionsMenu
          menuActions={MENU_ACTIONS}
          selected={selectedData.selected}
          clearSelected={selectedData.clearSelected}
        />
        <FilterInput
          searchValue={search.searchValue}
          onChangeSearch={handleChangeFilter}
        />
        <p className="flex flex-1 justify-center">
          <span className="mr-2">{`${selectedData.selected.length}/${candidates.length} selected`}</span>
          <button
            className="cursor-pointer text-blue-700 underline"
            onClick={() => {
              selectedData.toggleMultipleSelect(
                candidates.map((item) => {
                  return item.id;
                }),
              );
            }}
          >
            {selectedData.areAllDataSelected
              ? 'Unselect all'
              : `Select all ${candidates.length}`}
          </button>
        </p>
        <LinkButton path="/candidates/add">ADD</LinkButton>
      </div>

      <Table
        data={pagination.currentPageData}
        renderRow={renderCandidatesRow}
        header={<Table.Header headers={headers} />}
        footer={<Table.Pagination {...pagination} />}
      />
    </>
  );
};
