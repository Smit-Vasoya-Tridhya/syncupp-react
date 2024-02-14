'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
//import AddClientForm from '../create-edit/add-client-form';
import { Badge, Button } from 'rizzui';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    Islastitem?: boolean,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  currentPage?: number;
  pageSize?: number;
  searchTerm?: string;
};

export const billingColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  currentPage,
  pageSize,
  searchTerm,
}: Columns) => [
  {
    title: (
      <HeaderCell
        title="No#"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'brand'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('No'),
    dataIndex: 'No',
    key: 'No',
    width: 200,
    render: (value: string, row: any) => {
      // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      return (
        <Text className="font-medium capitalize text-gray-700">{value}</Text>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title="Billing Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' &&
          sortConfig?.key === 'billing_amount'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('billing_amount'),
    dataIndex: 'billing_amount',
    key: 'billing_amount',
    width: 200,
    render: (value: string) => (
      <>
        <Text className="font-medium text-gray-700">{value}</Text>
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'Date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('Date'),
    dataIndex: 'Date',
    key: 'Date',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Seats Counts"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'seats_counts'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('seats_counts'),
    dataIndex: 'seats_counts',
    key: 'seats_counts',
    width: 200,
    render: (value: string) => {
      return (
        <Text className="font-medium  capitalize text-gray-700">{value}</Text>
      );
    },
  },
];
