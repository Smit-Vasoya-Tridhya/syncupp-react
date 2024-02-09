'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch } from 'react-redux';
import { ActionIcon, Button, Popover, Tooltip } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import moment from 'moment';


type Columns = {
    data: any[];
    sortConfig?: any;
    handleSelectAll: any;
    checkedItems: string[];
    onDeleteItem: (id: string | string[], currentPage?: any, countPerPage?: number, Islastitem?: boolean, sortConfig?: Record<string, string>, searchTerm?: string) => void;
    onHeaderCellClick: (value: string) => void;
    onChecked?: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
    searchTerm?: string;
};


export const AgreementColumns = ({
    data,
    sortConfig,
    checkedItems,
    onDeleteItem,
    onHeaderCellClick,
    handleSelectAll,
    onChecked,
    currentPage,
    pageSize,
    searchTerm
}: Columns) => {

    const dispatch = useDispatch();

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
                    title="Title"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'title'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('title'),
            dataIndex: 'title',
            key: 'title',
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700 capitalize">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="RECEIVER"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'receiver'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('receiver'),
            dataIndex: 'receiver',
            key: 'receiver',
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="DUEDATE"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('due_date'),
            dataIndex: 'due_date',
            key: 'due_date',
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format("Do MMM. ‘YY") : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="STATUS"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('status'),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },


        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: <HeaderCell title="Actions" className="opacity-0" />,
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (_: string, row: Record<string, string>) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Tooltip
                        size="sm"
                        content={() => 'View Agreement'}
                        placement="top"
                        color="invert"
                    >
                        <Link href={`/client/agreement/${row?._id}`}>
                            <Button size="sm" variant="outline" className='bg-white text-black' aria-label={'View Agreement'}>
                                <EyeIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Tooltip>
                </div>
            ),
        },
    ];
}
