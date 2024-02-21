'use client';

import { Form } from '@/components/ui/form';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import Select from '@/components/ui/select';
import { getAllTask } from '@/redux/slices/user/task/taskSlice';
import { getAllActivity, setActivityName } from '@/redux/slices/user/activity/activitySlice';


export default function ActivitySelectionForm(props: any) {
    const { setActivityType, statusType, startDate, endDate, period } = props;
    const dispatch = useDispatch();
    const activityData = useSelector((state: any) => state?.root?.activity);


    let initialValue: Record<string, string> = {
        activity_selection: ''
    }

    let activityOptions: Record<string, any>[] = [
        { name: 'Task', value: 'task' },
        { name: 'Call meeting', value: 'call_meeting' },
        { name: 'Others', value: 'others' },
    ]

    const handleAgencyChange = (selectedOption: Record<string, any>) => {
        setActivityType(selectedOption?.value)
        dispatch(setActivityName(selectedOption?.value));
        endDate === '' ? 
            dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', filter: { status: statusType, activity_type: selectedOption?.value } })) 
        :
            dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', filter: { status: statusType, activity_type: selectedOption?.value, date: period, start_date: startDate, end_date: endDate } }))
    }

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
                        <Controller
                            control={control}
                            name="activity_selection"
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    options={activityOptions}
                                    onChange={(selectedOption: Record<string, any>) => {
                                        onChange(selectedOption?.name);
                                        handleAgencyChange(selectedOption);
                                    }}
                                    value={value}
                                    placeholder='Select Activity'
                                    // getOptionValue={(option) => option.value}
                                    className="font-medium [&>label>span]:font-medium"
                                    dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg absolute"
                                />
                            )}
                        />
                    </div>
                )}
            </Form>
        </>
    );
}
