'use client';

import SelectLoader from '@/components/loader/select-loader';
import { Form } from '@/components/ui/form';
import { getAllClient, setClientId, setClientName } from '@/redux/slices/user/client/clientSlice';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";



const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});


export default function ClientSelectionForm() {

    const dispatch = useDispatch();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    useEffect(() => {
        dispatch(getAllClient({ pagination: false }))
    }, [dispatch]);

    // console.log("Clients list....", clientSliceData?.clients)

    let initialValue: Record<string, string> = {
        client_selection: clientSliceData?.clientName ?? ''
    }

    let clientOptions: Record<string, any>[] = clientSliceData?.clientList && clientSliceData?.clientList?.length > 0 ? clientSliceData?.clientList?.map((client: Record<string, any>) => {
        let client_name = client?.first_name + " " + client?.last_name
        return { name: client_name, value: client?.reference_id, key: client }
    }) : [];

    const handleClientChange = (selectedOption: Record<string, any>) => {
        // console.log("selected option....", selectedOption)
        dispatch(setClientName(selectedOption?.name))
        dispatch(setClientId(selectedOption?.value))
        dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', client_id: selectedOption?.value }))
    }

    const onSubmit = (data: any) => {
        // console.log('form data', data);
    };

    if (clientSliceData?.clientList?.length === 0) {
        return <SelectLoader />
    } else {
        return (
            <>
                <Form
                    onSubmit={onSubmit}
                    useFormProps={{
                        defaultValues: initialValue
                    }}
                >
                    {({ control, formState: { errors } }) => (
                        <div className="w-[10rem] float-right">
                            <Controller
                                control={control}
                                name="client_selection"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={clientOptions}
                                        onChange={(selectedOption: Record<string, any>) => {
                                            onChange(selectedOption?.name);
                                            handleClientChange(selectedOption);
                                        }}
                                        value={value}
                                        placeholder='Select Client'
                                        // getOptionValue={(option) => option.value}
                                        className="font-medium"
                                        dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg"
                                    />
                                )}
                            />
                        </div>
                    )}
                </Form>
            </>
        );
    }
}
