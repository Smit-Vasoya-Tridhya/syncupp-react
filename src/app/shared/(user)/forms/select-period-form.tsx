'use client';

import { Form } from '@/components/ui/form';
import { getClientAgencies, setAgencyId, setAgencyName } from '@/redux/slices/user/client/clientSlice';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { getAllTask } from '@/redux/slices/user/task/taskSlice';
import { DatePicker } from '@/components/ui/datepicker';


export default function ActivitySelectionForm() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const { gridView } = useSelector((state: any) => state?.root?.task);

    useEffect(() => { dispatch(getClientAgencies()) }, [dispatch]);
    let initialValue: Record<string, string> = {
        // agency_selection: clientSliceData?.agencyName ?? ''
        agency_selection: ''
    }

    let agencyOptions: Record<string, any>[] = clientSliceData?.agencies && clientSliceData?.agencies?.length > 0 ? clientSliceData?.agencies?.map((agency: Record<string, string>) => {
        let agency_name = agency?.first_name + " " + agency?.last_name
        return { name: agency_name, value: agency?.reference_id, key: agency }
    }) : [];

    const handleAgencyChange = (selectedOption: Record<string, any>) => {
        dispatch(setAgencyName(selectedOption?.name))
        dispatch(setAgencyId(selectedOption?.value))
        console.log("pathname...", pathname)
        if (pathname === "/team") {
            dispatch(getAllTeamMember({
                sort_field: 'createdAt',
                sort_order: 'desc',
                agency_id: selectedOption?.value,
                pagination: true
            }));
        } else if (pathname === "/task") {

            !gridView ? dispatch(getAllTask({ sort_field: 'createdAt', sort_order: 'desc', agency_id: selectedOption?.value, pagination: true })) : dispatch(getAllTask({ pagination: false }))
        }
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
                    <div className="w-[10rem]">
                        {/* <Controller
                            name="due_date"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <DatePicker
                                    selected={value}
                                    inputProps={{
                                        label: 'Due Date & Time',
                                        color: 'info'
                                    }}
                                    placeholderText='Select due date & time'
                                    onChange={onChange}
                                    selectsStart
                                    startDate={value}
                                    minDate={new Date()}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            )}
                        /> */}
                    </div>
                )}
            </Form>
        </>
    );
}
