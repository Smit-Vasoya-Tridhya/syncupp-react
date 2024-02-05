'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
import AddClientReviewForm from '../create-edit/add-edit-client-review-form';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 50,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row._id)}
          {...(onChecked && { onChange: () => onChecked(row._id) })}
        />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Profile Picture"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'profile_picture'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('profile_picture'),
    dataIndex: 'profile_picture',
    key: 'profile_picture',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Customer Name"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'customer_name'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('customer_name'),
    dataIndex: 'customer_name',
    key: 'customer_name',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Company Name"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'company_name'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('company_name'),
    dataIndex: 'company_name',
    key: 'company_name',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Review"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'review'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('review'),
    dataIndex: 'review',
    key: 'review',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: Record<string, string>) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <CustomModalButton 
          title="Edit Client Review"
          icon={<PencilIcon className="h-4 w-4" />}
          view={<AddClientReviewForm title="Edit Client Review" row={row} /> }
          customSize="800px"
        />
        <DeletePopover
          title={`Delete the FAQ`}
          description={`Are you sure you want to delete?`}
          onDelete={() => onDeleteItem(row._id)}
        />
      </div>
    ),
  },
];
