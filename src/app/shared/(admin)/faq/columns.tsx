'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import DeletePopover from '@/app/shared/delete-popover';


type Columns = {
    data: any[];
    sortConfig?: any;
    handleSelectAll: any;
    checkedItems: string[];
    onDeleteItem: (id: string, currentPage?: number, Islastitem?: boolean) => void;
    onHeaderCellClick: (value: string) => void;
    onChecked?: (id: string) => void;
    currentPage?: number;
    pageSize?: number

};


export const getColumns = ({
    data,
    sortConfig,
    checkedItems,
    onDeleteItem,
    onHeaderCellClick,
    handleSelectAll,
    onChecked,
    currentPage,
    pageSize
}: Columns) => {

    return [
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
                    title="Firs Name"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'first_name'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('first_name'),
            dataIndex: 'first_name',
            key: 'first_name',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Last Name"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'last_name'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('last_name'),
            dataIndex: 'last_name',
            key: 'last_name',
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
                    <DeletePopover
                        title={`Delete the client`}
                        description={`Are you sure you want to delete?`}
                        onDelete={() => onDeleteItem(row._id, currentPage, data?.length <= 1 ? true : false)}
                    />
                </div>
            ),
        },
    ];
}
