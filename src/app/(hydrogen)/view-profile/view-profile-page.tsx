'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';
import { useDispatch, useSelector } from 'react-redux';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiNotePencilDuotone, PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import Spinner from '@/components/ui/spinner';
import { getAgencyData, postAgencyUpdateData } from '@/redux/slices/user/agency/agencySlice';
import { AgencyFormSchema, agencyFormSchema } from '@/utils/validators/agency.schema';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { getCities, getState } from '@/redux/slices/user/client/clientSlice';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function UserViewProfileForm(props:any) {
  // const { data } = props;
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const { closeModal } = useModal();
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const signIn = useSelector((state: any) => state?.root?.signIn);


  const router = useRouter();
  const userAgency = useSelector((state: any) => state?.root?.userAgency)
  const clientSliceData = useSelector((state: any) => state?.root?.client);

useEffect(() => {
  // if(signIn?.user?.data?.user?.role?.name === "agency"){
  //   dispatch(getAgencyData())
  // }else{
  //   dispatch(getAgencyData())
  // }
    dispatch(getAgencyData())
}, [dispatch]);

const data = userAgency?.data

const initialValues = {
  email:data?.email??'',
  first_name:data?.first_name?? '',
  last_name:data?.last_name?? '',
  contact_number:data?.contact_number??'',
  address:data?.address??'',
  city:data?.city??'',
  company_name:data?.reference_id?.company_name??'',
  company_website:data?.reference_id?.company_website??'',
  country:data?.country??'',
  industry:data?.reference_id?.industry??'',
  no_of_people:data?.reference_id?.no_of_people??'',
  pin_code:data?.pin_code??'',
  state:data?.state??'',
  role: data?.role??''
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
    dispatch(postAgencyUpdateData(data)).then((result: any) => {
      if (postAgencyUpdateData.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.dashboard);
        } 
      }
    })
  };

  console.log(initialValues,'initial.....')
  if(userAgency?.getProfileStatus==='pending') {
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
        className=" [&_label]:font-medium p-10"
      >
        {({ register, control,formState: { errors } }) => (
          
          <div className="space-y-5">
                <h4>Personal information</h4>
                <span className='inline-flex gap-5'>
                {!isOpenEditMode && (
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => setIsOpenEditMode(!isOpenEditMode)}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiNotePencilDuotone className="h-[18px] w-[18px]" />
              </ActionIcon>)}
              </span>
              <div className='grid grid-cols-2 gap-4 pt-5'>

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
                type="text"
                label="Contact number"
                placeholder="Enter Contact number Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact_number')}
                error={errors.contact_number?.message}
                disabled={true}
                />
            <Input
                onKeyDown={handleKeyDown}
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
                <div className='grid grid-cols-2 gap-4 pt-5'>
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
                <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="How many people"
                placeholder="Enter number of people Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('no_of_people')}
                error={errors.no_of_people?.message}
                disabled={!isOpenEditMode}
                />
                <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Industry"
                placeholder="Enter industry name Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('industry')}
                error={errors.industry?.message}
                disabled={!isOpenEditMode}
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
              <div className='grid grid-cols-2 gap-4 pt-5'>
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
                placeholder="Enter pin_code Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('pin_code')}
                error={errors.pin_code?.message}
                disabled={!isOpenEditMode}
              />
              </div>
              {isOpenEditMode && (
            <div className={cn('space-y-5')}>
                <Button
                  type="submit"
                  className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white float-end"
                  disabled={userAgency.loading}
                >
                  Save
                  {userAgency.loading && <Spinner size="sm" tag='div' className='ms-3' />}
                </Button>
              </div>
              )}
          </div>
        )}
      </Form>
    </>
  );
}}
