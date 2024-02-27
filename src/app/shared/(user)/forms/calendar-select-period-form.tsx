'use client';

import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { DatePicker } from '@/components/ui/datepicker';
import moment from 'moment';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';




export default function CalendarDatePeriodSelectionForm(props: any) {

    const { setStartDate, setEndDate, setTimeStatusType, setEvents, timeStatusType  } = props;

    const dispatch = useDispatch();
    const pathname = usePathname();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const signIn = useSelector((state: any) => state?.root?.signIn)


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


        if (signIn?.role !== 'client' && signIn?.role !== 'team_client') {
            !!end && setTimeStatusType('');
            !!end && dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', filter: { date: 'period', start_date: moment(start).format('DD-MM-YYYY'), end_date: moment(end).format('DD-MM-YYYY') }, pagination: false })).then((result: any) => {
                // console.log("result...", result);
                if (getAllActivity.fulfilled.match(result)) {
                  if (result && result?.payload?.response?.success === true) {
                    const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                      return {
                        ...dataa,
                        start: new Date(dataa?.start),
                        end: new Date(dataa?.end),
                      }
                    }) || [];
                    // console.log("customize event data....", eventData)
                    setEvents(eventData)
                  }
                }
              })
        
        } else {
            !!end && setTimeStatusType('');
            !!end && dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId, filter: { date: 'period', start_date: moment(start).format('DD-MM-YYYY'), end_date: moment(end).format('DD-MM-YYYY') }, pagination: false })).then((result: any) => {
                // console.log("result...", result);
                if (getAllActivity.fulfilled.match(result)) {
                  if (result && result?.payload?.response?.success === true) {
                    const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                      return {
                        ...dataa,
                        start: new Date(dataa?.start),
                        end: new Date(dataa?.end),
                      }
                    }) || [];
                    // console.log("customize event data....", eventData)
                    setEvents(eventData)
                  }
                }
              })
        }

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
