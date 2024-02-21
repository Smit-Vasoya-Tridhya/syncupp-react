'use client';

import { Form } from '@/components/ui/form';
import { getClientAgencies, setAgencyId, setAgencyName } from '@/redux/slices/user/client/clientSlice';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { DatePicker } from '@/components/ui/datepicker';
import moment from 'moment';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';




export default function DatePeriodSelectionForm(props: any) {

    const { setStartDate, setEndDate, activityType, statusType, setPeriod } = props;

    const dispatch = useDispatch();
    const pathname = usePathname();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const { gridView } = useSelector((state: any) => state?.root?.task);

    let initialValue: Record<string, string> = {
        time_selection: ''
    }

    const [startRangeDate, setStartRangeDate] = useState(null);
    const [endRangeDate, setEndRangeDate] = useState(null);
    const handleRangeChange = (dates: any) => {
        const [start, end] = dates;
        setStartRangeDate(start);
        setEndRangeDate(end);
        setStartDate(moment(start).format('DD-MM-YYYY'))
        !!end && setEndDate(moment(end).format('DD-MM-YYYY'))
        !!end && dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', filter: { status: statusType, activity_type: activityType, date: 'period', start_date: moment(start).format('DD-MM-YYYY'), end_date: moment(end).format('DD-MM-YYYY') } }))
        !!end && setPeriod('period')

    };

    const onSubmit = (data: any) => {
    };

    return (
        <>
            <Form
                onSubmit={onSubmit}
                useFormProps={{
                    defaultValues: initialValue,
                    mode: 'all'
                }}
            >
                {({ control, formState: { errors } }) => (
                    <div>
                        <DatePicker
                            selected={startRangeDate}
                            onChange={handleRangeChange}
                            startDate={startRangeDate}
                            endDate={endRangeDate}
                            monthsShown={1}
                            placeholderText="Select Date in a Range"
                            className="[&>label>span]:font-medium"
                            selectsRange
                        />
                    </div>
                )}
            </Form>
        </>
    );
}
