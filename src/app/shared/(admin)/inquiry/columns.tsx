'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import DeletePopover from '@/app/shared/delete-popover';
import { useDispatch } from 'react-redux';
import PencilIcon from '@/components/icons/pencil';
import { ActionIcon, Button, Popover, Tooltip } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import { AiOutlineFilePdf } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import moment from 'moment';
import { downloadAgreement, getAllAgencyagreement, sendAgreement, updateagreementStatus } from '@/redux/slices/user/agreement/agreementSlice';
import { useSelector } from 'react-redux';



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


export const InquiryColumns = ({
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
}: Columns) => {

    const dispatch = useDispatch();
    const { agreementDetails, loading } = useSelector((state: any) => state?.root?.agreement);


    const StatusHandler = (status: string, id: string, setOpen: any) => {
        setOpen(false)
        dispatch(updateagreementStatus({ data: { status: status }, id: id })).then((result: any) => {
            if (updateagreementStatus.fulfilled.match(result)) {
                // console.log('resultt', result)
                if (result && result.payload.success === true) {
                    dispatch(getAllAgencyagreement({ page: currentPage, items_per_page: pageSize, sort_field: sortConfig?.key, sort_order: sortConfig?.direction }));
                }
            }
        })
    }


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
                    title="Name"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('name'),
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Email ID"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'email'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('email'),
            dataIndex: 'email',
            key: 'email',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Mobile Number"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'mobile_number'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('mobile_number'),
            dataIndex: 'mobile_number',
            key: 'mobile_number',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Message"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'message'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('message'),
            dataIndex: 'message',
            key: 'message',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Date & Time"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'date_and_time'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('date_and_time'),
            dataIndex: 'date_and_time',
            key: 'date_and_time',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format('MM/DD/YYYY') : "-"}</Text>
            ),
        },

    
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: <HeaderCell title="Actions" className="opacity-0" />,
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: Record<string, string>) => (
                <div className="flex items-center justify-start gap-3 pe-4">
                    <DeletePopover
                        title={`Delete the Agreement`}
                        description={`Are you sure you want to delete?`}
                        onDelete={() => onDeleteItem([row._id], currentPage, pageSize, data?.length <= 1 ? true : false, sortConfig, searchTerm)}
                    />
                </div>
            ),
        },
    ];
}