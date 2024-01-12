'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import {Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import { ProductType } from '@/data/products-data';
import DeletePopover from '@/app/shared/delete-popover';
import EditTeamMemberForm from './edit-team-member';
import CustomModalButton from '../../custom-modal-button';
import { Columns } from '@/types';

// type Columns = {
//   data: any[];
//   sortConfig?: any;
//   handleSelectAll: any;
//   checkedItems: string[];
//   onDeleteItem: (id: string) => void;
//   onHeaderCellClick: (value: string) => void;
//   onChecked?: (id: string) => void;
// };

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
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: (
    <HeaderCell
    title="Member Name"
    sortable
    ascending={
      sortConfig?.direction === 'asc' && sortConfig?.key === 'first_name'
    }
    />),
    onHeaderCell: () => onHeaderCellClick('first_name'),
    dataIndex: 'first_name',
    key: 'first_name',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.first_name}</Text>
    ),
  },
  {
    title: (
    <HeaderCell
    title="Email"
    sortable
    ascending={
      sortConfig?.direction === 'asc' && sortConfig?.key === 'email'
    }
    />),
    onHeaderCell: () => onHeaderCellClick('email'),
    dataIndex: 'email',
    key: 'email',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.email}</Text>
    ),
  },
  {
    title: (
    <HeaderCell
    title="Conact no"
    sortable
    ascending={
      sortConfig?.direction === 'asc' && sortConfig?.key === 'contact_number'
    }
    />),
    onHeaderCell: () => onHeaderCellClick('contact_number'),
    dataIndex: 'contact_number',
    key: 'contact_number',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.contact_number}</Text>
    ),
  },
  {
    title: (
    <HeaderCell
    title="Role"
    sortable
    ascending={
      sortConfig?.direction === 'asc' && sortConfig?.key === 'member_role'
    }
    />),
    onHeaderCell: () => onHeaderCellClick('member_role'),
    dataIndex: 'member_role',
    key: 'member_role',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.member_role}</Text>
    ),
  },
  {
    title: (
    <HeaderCell
    title="status"
    sortable
    ascending={
      sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
    }
    />),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{row.status}</Text>
    ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: ProductType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Team member'}
          placement="top"
          color="invert"
        >
          <CustomModalButton 
            icon={<PencilIcon className="h-4 w-4" />}
            view={<EditTeamMemberForm/>}
            customSize="625px"
          />
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Member'}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.editTeam.productDetails(row.id)}> */}
          <Link href={routes.viewTeam}>
            <ActionIcon size="sm" variant="outline" aria-label={'View Member'}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
