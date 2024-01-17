'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button } from '@/components/ui/button';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/(user)/client/client-list/columns';
// const FilterElement = dynamic(
//   () => import('@/app/shared/(user)/client/client-list/filter-element'),
//   { ssr: false }
// );
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  status: '',
};

const defaultDeleteFunction = (id: string | string[], currentPage?: number, countPerPage?: number) => { };
const emptyHandleChangePage = async (paginationParams?: any) => {
  return Promise.resolve();
};

export default function ClientTable({ 
  data = [],  
  handleDeleteById = defaultDeleteFunction, 
  handleChangePage = emptyHandleChangePage, 
  total,
  page
}: { 
  data: any[]; 
  handleDeleteById?: (id: string | string[], currentPage?: number, countPerPage?: number) => any; 
  handleChangePage?: (paginationParams: any) => Promise<any>; 
  total?: number;
  page?: number;
}) {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState<number>(page as number);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: any) => {
    console.log("Delete id...", id)
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const {
    isLoading,
    isFiltered,
    tableData,
    // currentPage,
    // totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, handleDeleteById, handleChangePage, pageSize, filterState, currentPage, setCurrentPage);

  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <>
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: total,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          hideIndex: 1,
          columns,
          checkedColumns,
          setCheckedColumns,
          enableDrawerFilter: true,
        }}
        // filterElement={
        //   <FilterElement
        //     filters={filters}
        //     isFiltered={isFiltered}
        //     updateFilter={updateFilter}
        //     handleReset={handleReset}
        //   />
        // }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            {/* <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Products' : 'Product'}
            </Button> */}
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
