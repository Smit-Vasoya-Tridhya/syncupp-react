'use client';

import Link from 'next/link';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';

import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '@/redux/slices/user/auth/signinSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';
import { login } from '@/redux/slices/affiliate/authSlice';
import { ContactusSchema, contactusSchema } from '@/utils/validators/affiliate/contact-us.schema';
import { contactusformapicall } from '@/redux/slices/affiliate/contactusSlice';
import { useEffect, useState } from 'react';
import { getCountry } from '@/redux/slices/user/client/clientSlice';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});


const peopleCountOptions = [
    { name: '1-50', value: '1-50' },
    { name: '51-200', value: '51-200' },
    { name: '201-500', value: '201-500' },
    { name: '501-1000', value: '501-1000' },
]

export default function ContactusForm() {
    const isMedium = useMedia('(max-width: 1200px)', false);

    const dispatch = useDispatch();
    const router = useRouter();

    const { loading } = useSelector((state: any) => state?.root?.contactus)
    const CountrylistData = useSelector((state: any) => state?.root?.client);

    const [resetValues, setResetValues] = useState<ContactusSchema | any>({});
    const [selectedcountry, setselectedcountry] = useState<any>(null)
    const [selectedcompanysize, setselectedcompanysize] = useState<any>(null)
    console.log(selectedcountry, selectedcompanysize, '52')


    const CountryOptions =
        CountrylistData?.countries && CountrylistData?.countries?.length > 0 ? CountrylistData?.countries?.map((country: any) => ({
            name: country?.name,
            value: country?._id,
            key: country
        })) : [];


    const initialValues: ContactusSchema = {
        first_name: '',
        last_name: '',
        email: '',
        contact_number: '',
        country: selectedcountry?.value,
        no_of_people: selectedcompanysize?.value,
        thoughts: '',
        isAgreedtosyncup: false,
    };


    useEffect(() => {
        dispatch(getCountry());
    }, []);

    const onSubmit: SubmitHandler<ContactusSchema> = (data) => {
        // console.log(data, 'data')
        dispatch(contactusformapicall(data)).then((result: any) => {
            if (contactusformapicall.fulfilled.match(result)) {
                // console.log(result, 'result', result?.payload?.data?.user?.status, result?.payload?.data?.user?.role?.name)
                if (result && result.payload.success === true) {
                    // router.replace(routes.dashboard);
                    setResetValues({
                        first_name: '',
                        last_name: '',
                        email: '',
                        contact_number: '',
                        country: null,
                        no_of_people: null,
                        thoughts: '',
                        isAgreedtosyncup: false,
                    });
                    setselectedcompanysize(null)
                    setselectedcountry(null)

                }
            }
        })
    };

    return (
        <>
            <Form<ContactusSchema>
                validationSchema={contactusSchema}
                onSubmit={onSubmit}
                resetValues={resetValues} // Pass the reset values to the Form component
                useFormProps={{
                    mode: 'onTouched',
                    defaultValues: initialValues,
                }}
            >
                {({ register, formState: { errors }, control }) => (
                    console.log(errors, 'errors'),
                    <div className="space-y-5">
                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="*First Name:"
                            placeholder="Enter First name"
                            // rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('first_name')}
                            error={errors?.first_name?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="*Last Name:"
                            placeholder="Enter Last name"
                            // rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('last_name')}
                            error={errors?.last_name?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="email"
                            label="*Email"
                            placeholder="Enter Company mail"
                            // rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('email')}
                            error={errors?.email?.message}
                        />
                        <Input
                            onKeyDown={handleKeyDown}
                            type="number"
                            label="*Phone number:"
                            placeholder="Enter Phone number"
                            color="info"
                            className="[&>label>span]:font-medium"
                            {...register('contact_number')}
                            error={errors.contact_number?.message}
                        />

                        <Controller
                            control={control}
                            name="country"
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    options={CountryOptions}
                                    onChange={(selectedOption: any) => {
                                        setselectedcountry(selectedOption);
                                        onChange(selectedOption?.name);
                                    }}
                                    value={value}
                                    label="Country"
                                    color="info"
                                    size={isMedium ? 'lg' : 'xl'}
                                    // rounded="pill"
                                    // Remove getOptionLabel and getOptionValue props
                                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                                    className="font-medium"
                                    error={errors?.country?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="no_of_people"
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    options={peopleCountOptions}
                                    onChange={(selectedOption: string) => {
                                        onChange(selectedOption);
                                        setselectedcompanysize(selectedOption);
                                    }}
                                    value={value}
                                    label="Company size"
                                    placeholder="Select Company size"
                                    // rounded="pill"
                                    color="info"
                                    size={isMedium ? 'lg' : 'xl'}
                                    getOptionValue={(option) => option.value}
                                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                                    className="font-medium"
                                    error={errors?.no_of_people?.message}
                                />
                            )}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="*Share your thoughts and let's dive into a meaningful discussion."
                            placeholder="Enter here"
                            // rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('thoughts')}
                            error={errors?.thoughts?.message}
                        />

                        <Checkbox
                            {...register('isAgreedtosyncup')}
                            label={`By checking the box and clicking " Submit", you are agreeing to Syncupp's Privacy Statemen.`}
                            color="info"
                            variant="flat"
                            className="[&>label>span]:font-medium"
                            error={errors.isAgreedtosyncup?.message}
                        />
                        <Button
                            className="w-full border-2 text-base font-bold"
                            type="submit"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            // rounded="pill"
                            disabled={loading}
                        >
                            SUBMIT
                            {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}
