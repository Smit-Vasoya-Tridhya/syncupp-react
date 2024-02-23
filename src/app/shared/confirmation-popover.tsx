'use client';

import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { putTaskStatusChange } from '@/redux/slices/user/task/taskSlice';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';

type ConfirmationPopoverProps = {
    title?: string;
    description?: string;
    action?: string;
    icon?: React.ReactNode;
    data?: any;
};

export default function ConfirmationPopover({
    title,
    description,
    action,
    icon,
    data
}: ConfirmationPopoverProps) {

    const dispatch = useDispatch();
    const activityData = useSelector((state: any) => state?.root?.activity);


    return (
        <Popover
            placement="left"
            className="z-50"
            content={({ setOpen }) => {

                const handleButtonClick = () => {

                    if(action === 'Complete') {
                        dispatch(putTaskStatusChange({ _id: data, status: 'completed' })).then((result: any) => {
                            if (putTaskStatusChange.fulfilled.match(result)) {
                              if (result && result.payload.success === true) {
                                dispatch(getAllActivity({ page: activityData?.pageNumber, items_per_page: activityData?.itemsPerPageNumber, sort_field: 'createdAt', sort_order: 'desc', pagination: true }))
                              }
                            }
                          });
                    } else if(action === 'Cancel') {
                        dispatch(putTaskStatusChange({ _id: data, status: 'cancel' })).then((result: any) => {
                            if (putTaskStatusChange.fulfilled.match(result)) {
                              if (result && result.payload.success === true) {
                                dispatch(getAllActivity({ page: activityData?.pageNumber, items_per_page: activityData?.itemsPerPageNumber, sort_field: 'createdAt', sort_order: 'desc', pagination: true }))
                              }
                            }
                          });
                    }
                    setOpen(false)
                }

                return (
                    <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
                        <Title
                            as="h6"
                            className="mb-0.5 flex items-start gap-2 text-sm text-gray-700 sm:items-center"
                        >
                            {icon} {title}
                        </Title>
                        <Text className="mb-2 leading-relaxed text-gray-500">
                            {description}
                        </Text>
                        <div className="flex items-center justify-end">
                            <Button size="sm" className="me-1.5 h-7" onClick={handleButtonClick}>
                                Yes
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7"
                                onClick={() => setOpen(false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                )
            }}
        >
            <Button
                size="sm"
                variant="outline"
                className="cursor-pointer hover:!border-gray-900 hover:text-gray-700 bg-white text-black"
            >
                {icon}
            </Button>
        </Popover>
    );
}
