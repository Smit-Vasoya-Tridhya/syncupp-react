import { useState, useEffect, useMemo } from 'react';
import isString from 'lodash/isString';
import { isArray } from 'lodash';

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  handleDeleteById: (id: string | string[]) => any,
  handleChangePage?: (paginationParams: any) => Promise<any>,
  pageSize?: any,
  initialFilterState?: Partial<Record<string, any>>,
  page?: any,
) {


  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: 'createdAt',
    direction: 'desc',
  });
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

  useEffect(() => {
    if (initialData?.length > 0) {
      setData(initialData);
    }
    // if (page) {
    //   setCurrentPage(+page);
    // }
  }, [initialData, page]);

    // API call......
    const handleAPICall = async (pageNumber?: any, pageSize?: any, searchTerm?: any, key?: any, direction?: any, filter?: any) => {
      if (handleChangePage && typeof handleChangePage === 'function') {
        try {
          const response = await handleChangePage({
            page: +pageNumber,
            items_per_page: pageSize,
            search: searchTerm,
            sort_field: key,
            sort_order: direction,
            // status: filter,
          });
          setData(response && response?.payload && response?.payload?.data);
          console.log(response.payload.data,'response.payload.data...........')
          setLoading(false);
        } catch (error) {
          console.error('API call error:', error);
          setLoading(false);
        }
      } else {
        console.error('handleChangePage is not a function');
        setLoading(false);
      }
    };

  /*
   * Dummy loading state.
   */

  useEffect(() => {
    setLoading(false);
    if (!searchTerm) {
      handleAPICall(+currentPage, pageSize, '', sortConfig.key, sortConfig.direction);
    }
  }, [currentPage, pageSize, searchTerm, sortConfig]);

  /*
   * Handle row selection
   */
  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys?.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys?.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRowKeys?.length === data?.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data?.map((record) => record?.id));
    }
  };

  /*
   * Handle sorting
   */


  function sortData(data: T[], sortKey: string, sortDirection: string) {
    // console.log("use table data....", data)
    
    return data && [...data].length > 0 && [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
      
  }

  const sortedData = useMemo(() => {
    let newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);

  const handleSort = async (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    await handleAPICall(currentPage, pageSize, searchTerm, key, direction);
  }

  /*
   * Handle pagination
   */
  function paginatedData(data: any = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if ( data && data.length > start) return data && data.slice(start, end);
    return data;
  }

  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }



  /*
   * Handle delete
   */
  const handleDelete = async (id: string | string[]) => {
    let updatedData: [] = [];
    if (handleDeleteById) {
      try {
        updatedData = await handleDeleteById(id);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    if (updatedData && updatedData.length > 0) {
      setData(updatedData);
    }
  }

  /*
   * Handle Filters and searching
   */


  const updateFilter = async (columnId: string, filterValue: string | any[]) => {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error('filterValue data type should be string or array of any');
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2');
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: filterValue,
    }));
    await handleAPICall(+currentPage, pageSize, searchTerm, '', '', filterValue);
  }

  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    // return (
    //   sortedData?.filter((item) => {
    //       const isMatchingItem = Object.entries(filters).some(
    //         ([columnId, filterValue]) => {
    //           if (
    //             Array.isArray(filterValue) &&
    //             typeof filterValue[1] === 'object'
    //           ) {
    //             const itemValue = new Date(item[columnId]);
    //             return (
    //               // @ts-ignore
    //               itemValue >= filterValue[0] && itemValue <= filterValue[1]
    //             );
    //           }
    //           if (
    //             Array.isArray(filterValue) &&
    //             typeof filterValue[1] === 'string'
    //           ) {
    //             const itemPrice = Math.ceil(Number(item[columnId]));
    //             return (
    //               itemPrice >= Number(filterValue[0]) &&
    //               itemPrice <= Number(filterValue[1])
    //             );
    //           }
    //           if (isString(filterValue) && !Array.isArray(filterValue)) {
    //             const itemValue = item[columnId]?.toString().toLowerCase();
    //             if (itemValue !== filterValue.toString().toLowerCase()) {
    //               return false;
    //             }
    //             return true;
    //           }
    //         }
    //       );
    //       return isMatchingItem;
    //     })
    //     // global search after running filters
    //     ?.filter((item: any) =>
    //       Object.values(item).some((value) =>
    //         typeof value === 'object'
    //           ? value &&
    //             Object.values(value).some(
    //               (nestedItem) =>
    //                 nestedItem &&
    //                 String(nestedItem).toLowerCase().includes(searchTermLower)
    //             )
    //           : value && String(value).toLowerCase().includes(searchTermLower)
    //       )
    //     )
    // );
  }

  /*
   * Handle searching
   */
  const handleSearch = async(searchValue: string) => {
    setSearchTerm(searchValue);
    await handleAPICall(currentPage, pageSize, searchValue);
  }

  // function searchedData() {
  //   if (!searchTerm) return sortedData;

  //   const searchTermLower = searchTerm.toLowerCase();

  //   return sortedData.filter((item) =>
  //     Object.values(item).some((value) =>
  //       typeof value === 'object'
  //         ? value &&
  //           Object.values(value).some(
  //             (nestedItem) =>
  //               nestedItem &&
  //               String(nestedItem).toLowerCase().includes(searchTermLower)
  //           )
  //         : value && String(value).toLowerCase().includes(searchTermLower)
  //     )
  //   );
  // }

  /*
   * Reset search and filters
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */
  const isFiltered = data && data.length > 0;
  // function calculateTotalItems() {
  //   if (isFiltered) {
  //     return applyFilters().length;
  //   }
  //   if (searchTerm) {
  //     return searchedData().length;
  //   }
  //   return sortedData.length;
  // }
  // const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();
  const tableData = paginatedData(data);

  /*
   * Go to first page when data is filtered and searched
   */
  // useEffect(() => {
  //   handlePaginate(1);
  // }, [isFiltered, searchTerm]);

  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,
    handlePaginate,
    // totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    // searching
    searchTerm,
    handleSearch,
    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
  };
}
