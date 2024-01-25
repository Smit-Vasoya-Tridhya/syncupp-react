'use client';

import SelectLoader from '@/components/loader/select-loader';
import { Form } from '@/components/ui/form';
import { getClientAgencies, setAgencyId } from '@/redux/slices/user/client/clientSlice';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";



const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});


export default function AgencySelectionForm() {

    const dispatch = useDispatch();
    const clientSliceData = useSelector((state: any) => state?.root?.client);

    useEffect(() => {
        dispatch(getClientAgencies())
    }, [dispatch]);

    // console.log("Agencies....", clientSliceData?.agencies)

    let initialValue: Record<string, string> = {
        agency_selection: clientSliceData?.agencies[0]?.first_name + " " + clientSliceData?.agencies[0]?.last_name ?? ''
    }


    let agencyOptions: Record<string, string>[] = [];

    clientSliceData?.agencies && clientSliceData?.agencies !== 0 && clientSliceData?.agencies?.map((agency: Record<string, string>) => {
        let agency_name = agency?.first_name + " " + agency?.last_name
        agencyOptions.push({ name: agency_name, value: agency_name })
    })

    const handleAgencyChange = (selectedOption: string) => {
        // console.log("selected option....", selectedOption)
        let [selectedOptionFirstName] = selectedOption?.split(' ');
        // console.log("selected option first name....", selectedOptionFirstName)

        const [agency] = clientSliceData?.agencies?.filter((agency: Record<string, string>) => agency?.first_name === selectedOptionFirstName)
        // console.log("Agency id.....", agency)
        dispatch(setAgencyId(agency?.reference_id))
    }

    const onSubmit = (data: any) => {
        console.log('sign up form data', data);
    };

    if (clientSliceData?.agencies.length === 0) {
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
                        <div className="space-y-5 float-right">
                            <Controller
                                control={control}
                                name="agency_selection"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={agencyOptions}
                                        onChange={(selectedOption: string) => {
                                            onChange(selectedOption);
                                            handleAgencyChange(selectedOption);
                                        }}
                                        value={value}
                                        placeholder='Select Agency'
                                        getOptionValue={(option) => option.value}
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
