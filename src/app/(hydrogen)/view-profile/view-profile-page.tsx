'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import { PiNotePencilDuotone, PiXBold } from 'react-icons/pi';
import { ActionIcon, Title } from 'rizzui';
import cn from '@/utils/class-names';
import Spinner from '@/components/ui/spinner';
import { AgencyFormSchema, agencyFormSchema } from '@/utils/validators/agency.schema';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { getCities, getCountry, getState } from '@/redux/slices/user/client/clientSlice';
import { getUserProfile, updateUserProfile } from '@/redux/slices/user/auth/signinSlice';
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
const industryOptions = [
  { name: 'IT', value: 'IT' },
  { name: 'Marketing', value: 'Marketing' },
  { name: 'Digital Marketing', value: 'Digital Marketing' },
]

export default function UserViewProfileForm(props:any) {
  const [reset, setReset] = useState({});
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const router = useRouter();
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch, isOpenEditMode]);

const data = signIn?.userProfile

const initialValues = {
  email:data?.email ??'',
  first_name:data?.first_name ?? '',
  last_name:data?.last_name ?? '',
  contact_number:data?.contact_number ??'',
  address:data?.reference_id?.address ??'',
  city:data?.reference_id?.city?.name ??'',
  company_name:data?.reference_id?.company_name ??'',
  company_website:data?.reference_id?.company_website ??'',
  country:data?.reference_id?.country?.name ??'',
  industry:data?.reference_id?.industry ??'',
  no_of_people:data?.reference_id?.no_of_people ??'',
  pincode:data?.reference_id?.pincode ??'',
  state:data?.reference_id?.state?.name ??'',
  role: data?.role ??''
};

const [regionalData, setRegionalData] = useState({
  city: data?.client?.city?.id,
  state: data?.client?.state?.id,
  country: data?.client?.country?.id
});  

let countryOptions: Record<string, string>[] = [];

clientSliceData?.countries !== '' && clientSliceData?.countries?.map((country: Record<string, string>) => {
  countryOptions.push({ name: country?.name, value: country?.name }) 
})

const countryHandleChange = (selectedOption: string) => {
  const [ countryObj ] = clientSliceData?.countries?.filter((country: Record<string, string>) => country?.name === selectedOption )
  dispatch(getState({ countryId: countryObj._id }))
  setRegionalData({...regionalData, country: countryObj._id})
};

let stateOptions: Record<string, string>[] = [];

clientSliceData?.states !== '' && clientSliceData?.states?.map((state: Record<string, string>) => {
  stateOptions.push({ name: state?.name, value: state?.name }) 
})

const stateHandleChange = (selectedOption: string) => {
  const [ stateObj ] = clientSliceData?.states?.filter((state: Record<string, string>) => state?.name === selectedOption )
  dispatch(getCities({ stateId: stateObj._id }))
  setRegionalData({...regionalData, state: stateObj._id})
};

let cityOptions: Record<string, string>[] = [];

clientSliceData?.cities !== '' && clientSliceData?.cities?.map((city: Record<string, string>) => {
  cityOptions.push({ name: city?.name, value: city?.name }) 
})

const cityHandleChange = (selectedOption: string) => {
  const [ cityObj ] = clientSliceData?.cities?.filter((city: Record<string, string>) => city?.name === selectedOption )
  setRegionalData({...regionalData, city: cityObj._id})
};

  const onSubmit: SubmitHandler<AgencyFormSchema> = (data) => {
    const formData = {
      email: data?.email ?? '',
      first_name: data?.first_name ?? '',
      last_name: data?.last_name ?? '',
      contact_number: data?.contact_number ?? '',
      address: data?.address ?? '',
      company_name: data?.company_name ?? '',
      company_website: data?.company_website ?? '',
      industry: data?.industry ?? '',
      no_of_people: data?.no_of_people ?? '',
      pincode: data?.pincode ?? '',
    };
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );
    const filteredRegionalData = Object.fromEntries(
      Object.entries(regionalData).filter(([_, value]) => value !== undefined && value !== '')
      );
    const fullData = { ...filteredRegionalData, ...filteredFormData }

    dispatch(updateUserProfile(fullData)).then((result: any) => {
      if (updateUserProfile.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.dashboard);
        } 
      }
    })
  };

  if(signIn?.getUserProfileStatus==='pending') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
  return (
    <>
      <Form<AgencyFormSchema>
        validationSchema={agencyFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-5">
            <Title>{isOpenEditMode ? 'Edit Profile' : 'View Profile'}</Title>
            <div className="flex items-center justify-between">
              <div>
                <h4>Personal information</h4>
              </div>
              <div className="mr-8">
                {!isOpenEditMode && (
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => setIsOpenEditMode(!isOpenEditMode)}
                    className="p-0 text-gray-500 hover:!text-gray-900"
                  >
                    <Button
                      className="hover:gray-700 float-end @xl:w-auto dark:bg-gray-200 dark:text-white"
                      onClick={() => {
                        setIsOpenEditMode(false);
                      }}
                    >
                      <PiNotePencilDuotone className="h-[20px] w-[20px] mr-1" />
                      Edit
                    </Button>
                  </ActionIcon>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-5">
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Email"
                placeholder="Enter Email address Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
                disabled={true}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="number"
                label="Contact number"
                placeholder="Enter Contact number Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact_number')}
                error={errors.contact_number?.message}
                disabled={!isOpenEditMode}
              />
              <Input
                // onKeyDown={handleKeyDown}
                type="text"
                label="First Name"
                placeholder="Enter First Name"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('first_name')}
                error={errors.first_name?.message}
                disabled={!isOpenEditMode}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Last Name"
                placeholder="Enter Last Name"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('last_name')}
                error={errors.last_name?.message}
                disabled={!isOpenEditMode}
              />
            </div>
            <h4>Comapny Information</h4>
            <div className="grid grid-cols-2 gap-4 pt-5">
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Company name"
                placeholder="Enter Comapny Name Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('company_name')}
                error={errors.company_name?.message}
                disabled={!isOpenEditMode}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Company website"
                placeholder="Enter Comapny website Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('company_website')}
                error={errors.company_website?.message}
                disabled={!isOpenEditMode}
              />
              <Controller
                control={control}
                name="no_of_people"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={peopleCountOptions}
                    onChange={(selectedOption: string) => {
                      onChange(selectedOption);
                    }}
                    value={value}
                    label="How many people"
                    color="info"
                    getOptionValue={(option) => option.value}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                    error={errors?.no_of_people?.message as string}
                    disabled={!isOpenEditMode}
                  />
                )}
              />
              <Controller
                control={control}
                name="industry"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={industryOptions}
                    onChange={(selectedOption: string) => {
                      onChange(selectedOption);
                    }}
                    value={value}
                    label="Industry"
                    color="info"
                    getOptionValue={(option) => option.value}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                    error={errors?.industry?.message as string}
                    disabled={!isOpenEditMode}
                  />
                )}
              />
            </div>
            <h4>General Information</h4>
            <Input
              onKeyDown={handleKeyDown}
              type="text"
              label="Address"
              placeholder="Enter address Here..."
              color="info"
              className="[&>label>span]:font-medium"
              {...register('address')}
              error={errors.address?.message}
              disabled={!isOpenEditMode}
            />
            <div className="grid grid-cols-2 gap-4 pt-5">
              <Controller
                name="country"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={countryOptions}
                    value={value}
                    onChange={(selectedOption: string) => {
                      onChange(selectedOption);
                      countryHandleChange(selectedOption);
                    }}
                    label="Country"
                    error={errors?.country?.message as string}
                    getOptionValue={(option) => option.name}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                    disabled={!isOpenEditMode}
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={stateOptions}
                    value={value}
                    onChange={(selectedOption: string) => {
                      onChange(selectedOption);
                      stateHandleChange(selectedOption);
                    }}
                    label="State"
                    disabled={stateOptions.length === 0}
                    error={errors?.state?.message as string}
                    getOptionValue={(option) => option.name}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={cityOptions}
                    value={value}
                    onChange={(selectedOption: string) => {
                      onChange(selectedOption);
                      cityHandleChange(selectedOption);
                    }}
                    disabled={cityOptions.length === 0}
                    label="City"
                    error={errors?.city?.message as string}
                    getOptionValue={(option) => option.name}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                  />
                )}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Pin code"
                placeholder="Enter pincode Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('pincode')}
                error={errors.pincode?.message}
                disabled={!isOpenEditMode}
              />
            </div>
            {isOpenEditMode && (
              <div className={cn('flex space-x-4 ')}>
                <Button
                  variant="outline"
                  className="hover:gray-700 float-end @xl:w-auto dark:bg-gray-200 dark:text-white"
                  onClick={() => {
                    setIsOpenEditMode(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="hover:gray-700 float-end @xl:w-auto dark:bg-gray-200 dark:text-white"
                  disabled={signIn.loading}
                >
                  Save
                  {signIn.loading && (
                    <Spinner size="sm" tag="div" className="ms-3" />
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </Form>
    </>
  );
}}
