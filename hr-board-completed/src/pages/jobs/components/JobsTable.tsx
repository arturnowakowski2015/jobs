import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

import {
  JOB_STATUS_TO_COPY,
  jobsService,
  type Job,
} from 'services/jobsService';
import { formatDateCreatedAt } from 'utils/formatDateCreatedAt';
import { JOBS_QUERY_KEY } from 'constants/constants';
import { Table } from 'components/table/Table';
import { Checkbox } from 'components/checkbox/Checkbox';
import { ActionsMenu, type Action } from 'components/menu/ActionsMenu';
import { LinkButton } from 'components/buttons';
import type { Header } from 'components/table/TableHeader';
import { useFilteredData } from 'hooks/useFilteredData';
import { usePaginatedData } from 'hooks/usePaginatedData';
import { useSearch } from 'hooks/useSearch';
import { useSelectedData } from 'hooks/useSelectedData';
import { FilterInput } from 'components/input/FilterInput';

type Props = {
  jobs: Job[];
};

export const JobsTable = ({ jobs }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteRow } = useMutation({
    mutationFn: jobsService.deleteOne,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: JOBS_QUERY_KEY });
      const previousJobs = queryClient.getQueryData(JOBS_QUERY_KEY);
      queryClient.setQueryData<Array<Job>>(JOBS_QUERY_KEY, (oldData) => {
        return oldData?.filter((data) => {
          return data.id !== id;
        });
      });
      return { previousJobs };
    },
    onSuccess: () => {
      toast('Job successfully deleted');
    },
    onError: (err, id, context) => {
      toast.warn('Could not delete Job');
      queryClient.setQueryData(JOBS_QUERY_KEY, context?.previousJobs);
    },
  });

  const { mutate: deleteRows } = useMutation({
    mutationFn: jobsService.deleteMany,
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: JOBS_QUERY_KEY });
      const previousJobs = queryClient.getQueryData(JOBS_QUERY_KEY);
      queryClient.setQueryData<Array<Job>>(JOBS_QUERY_KEY, (oldData) => {
        return oldData?.filter((data) => {
          return !ids.includes(data.id);
        });
      });
      return { previousJobs };
    },
    onSuccess: () => {
      toast('Jobs successfully deleted');
    },
    onError: (err, ids, context) => {
      toast.warn('Could not delete these Jobs');
      queryClient.setQueryData(JOBS_QUERY_KEY, context?.previousJobs);
    },
  });

  const search = useSearch();
  const { filteredData } = useFilteredData(
    jobs,
    'title',
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
    { id: 'title', label: 'Position' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
  ];

  const renderJobsRow = (job: Job) => {
    const isSelected = selectedData.selected.includes(job.id);
    return (
      <Table.Row key={job.id}>
        <Table.Cell>
          <Checkbox
            onChange={() => {
              selectedData.toggleOne(job.id);
            }}
            isChecked={isSelected}
          />
        </Table.Cell>
        <Table.Cell>{job.title}</Table.Cell>
        <Table.Cell>{formatDateCreatedAt(job.createdAt)}</Table.Cell>
        <Table.Cell>{JOB_STATUS_TO_COPY[job.status]}</Table.Cell>
        <Table.Cell>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                deleteRow(job.id);
              }}
            >
              {' '}
              <TrashIcon className="h-5 w-5 hover:scale-125" />
            </button>
            <NavLink to={`/Jobs/${job.id}`}>
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
          <span className="mr-2">{`${selectedData.selected.length}/${jobs.length} selected`}</span>
          <button
            className="cursor-pointer text-blue-700 underline"
            onClick={() => {
              selectedData.toggleMultipleSelect(
                jobs.map((item) => {
                  return item.id;
                }),
              );
            }}
          >
            {selectedData.areAllDataSelected
              ? 'Unselect all'
              : `Select all ${jobs.length}`}
          </button>
        </p>
        <LinkButton path="/jobs/add">ADD</LinkButton>
      </div>
      <Table
        data={pagination.currentPageData}
        renderRow={renderJobsRow}
        header={<Table.Header headers={headers} />}
        footer={<Table.Pagination {...pagination} />}
      />
    </>
  );
};
