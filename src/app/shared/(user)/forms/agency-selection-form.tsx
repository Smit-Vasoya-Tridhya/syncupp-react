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

    // useEffect(() => {
    //     dispatch(getClientAgencies())
    // }, [dispatch]);

    // console.log("Agencies....", clientSliceData?.agencies)

    const data = [
        {
            "agency_id": "65ae2a95bc5eba1802fa2779",
            "name": "John345",
            "status": "active",
            "_id": "65ae2fd4f06735f6c7f15fa5"
        },
        {
            "agency_id": "65adf682cab3de34e407d7c9",
            "name": "John567",
            "status": "active",
            "_id": "65afac3f043bcd8f720065a3"
        }
    ]

    let initialValue: Record<string, string> = {
        agency_selection: data[0]?.name ?? ''
    }

let agencyOptions: Record<string, string>[] = [];

  data && data?.length !== 0 && data?.map((dattaa: Record<string, string>) => {
    agencyOptions.push({ name: dattaa?.name, value: dattaa?.name }) 
  })

    const handleAgencyChange = (selectedOption: string) => {
        // console.log("selected option....", selectedOption)
        const [ agency ] = data?.filter((dataa: Record<string, string>) => dataa?.name === selectedOption )
        // console.log("Agency id.....", agency)
        dispatch(setAgencyId(agency?.agency_id))
    }

    const onSubmit = (data: any) => {
        console.log('sign up form data', data);
    };

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
