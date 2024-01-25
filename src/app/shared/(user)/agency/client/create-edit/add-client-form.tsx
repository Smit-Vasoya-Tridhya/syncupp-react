'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { handleKeyContactDown, handleKeyDown } from '@/utils/common-functions';
import TitleSeparation from './title-separation';
import { ClientSchema, clientSchema } from '@/utils/client-schema';
import { RemoveRegionalData, getAllClient, getCities, getClientById, getCountry, getState, patchEditClient, postAddClient } from '@/redux/slices/user/client/clientSlice';
import { useEffect, useState } from 'react';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});



export default function AddClientForm(props: any) {

  const { title, row } = props;
  // console.log("row data...", row)
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  
  
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();
  
  const [save, setSave] = useState(false)
  const [loader, setLoader] = useState(false);
  const [reset, setReset] = useState({})
  

  // let data = row;

  let initialValues: ClientSchema = {
    name: "",
    email: "",
    company_name: "",
    company_website: "",
    address: "",
    city: undefined,
    state: undefined,
    country: undefined,
    pincode: "",
    title: "",
    contact_number: ""
  };  

  
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  useEffect(() => {
    row && dispatch(getClientById({ clientId: row?._id }))
  }, [row, dispatch]); 

  let data = clientSliceData?.client;
  
  let defaultValuess = {
    name: data?.name,
    email: data?.email,
    company_name: data?.client?.company_name,
    company_website: data?.client?.company_website,
    address: data?.client?.address,
    city: data?.client?.city?.name,
    state: data?.client?.state?.name,
    country: data?.client?.country?.name,
    pincode: data?.client?.pincode,
    title: data?.client?.title,
    contact_number: data?.contact_number
  };


  const [regionalData, setRegionalData] = useState({
    city: data?.client?.city?.id,
    state: data?.client?.state?.id,
    country: data?.client?.country?.id
  });  
  // console.log("Regional Data....", regionalData)

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

  
  const onSubmit: SubmitHandler<ClientSchema> = (dataa) => {
    // console.log('Add client dataa---->', dataa);

    const formData = {
      name: dataa?.name ?? '',
      email: dataa?.email ?? '',
      company_name: dataa?.company_name ?? '',
      company_website: dataa?.company_website ?? '',
      address: dataa?.address ?? '',
      pincode: dataa?.pincode ?? '',
      title: dataa?.title ?? '',
      contact_number: dataa?.contact_number ?? ''
    }

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );


    const filteredRegionalData = Object.fromEntries(
      Object.entries(regionalData).filter(([_, value]) => value !== undefined && value !== '')
      );

    const fullData = { ...filteredRegionalData, ...filteredFormData }

    if(title === 'New Client') {
      dispatch(postAddClient(fullData)).then((result: any) => {
        if(postAddClient.fulfilled.match(result)) {
          setLoader(false);
          setSave(false);

          if (result && result.payload.success === true) {
            save && closeModal();
            setReset({...initialValues})
            dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc' }));
            dispatch(RemoveRegionalData())
            setSave(false);
          }
        }
      });
    } else {
      dispatch(patchEditClient({ ...fullData, clientId: data._id })).then((result: any) => {
        if(patchEditClient.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            save && closeModal();
            dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc' }));
            setSave(false);
          }
        }
      });
    } 
    
  };

  const handleSaveClick = () => {
    setSave(true);
  }
  
  if(!clientSliceData?.client && title === 'Edit Client') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
  return (
    <>
      <Form<ClientSchema>
        validationSchema={clientSchema}
        onSubmit={onSubmit}
        resetValues={reset}
        useFormProps={{
          mode: 'all',
          defaultValues: defaultValuess,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors , isSubmitSuccessful }, handleSubmit }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                {title}
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
                <TitleSeparation
                  className="pt-5 mb-8 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
                  title='Account Info'
                />
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4')}>
              <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Name *"
                  placeholder="Enter your name"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('name')}
                  error={errors?.name?.message}
                />
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Title"
                  placeholder="Enter title"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('title')}
                  error={errors?.title?.message}
                />
                <Input
                  onKeyDown={handleKeyDown}
                  type="email"
                  label="Email ID *"
                  placeholder="Enter your email"
                  disabled={title === 'Edit Client'}
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('email')}
                  error={errors?.email?.message}
                />
                <Input
                  onKeyDown={handleKeyContactDown}
                  type="text"
                  label="Phone"
                  placeholder="Enter phone number"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('contact_number')}
                  error={errors?.contact_number?.message}
                />
            </div>
              <TitleSeparation
                  className="pt-5 mb-8 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
                  title='Company Info'
                />
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4')}>
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Company Name *"
                  placeholder="Enter company name"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('company_name')}
                  error={errors?.company_name?.message as string}
                />
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Company Website"
                  placeholder="Enter website url"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('company_website')}
                  error={errors?.company_website?.message as string}
                />
            </div>
                <TitleSeparation
                  className="pt-5 mb-8 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
                  title='Address'
                />
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4')}>
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Address"
                  placeholder="Enter your address"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('address')}
                  error={errors?.address?.message as string}
                />
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
                      color="info"
                      error={errors?.country?.message as string}
                      getOptionValue={(option) => option.name}
                      dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                      className="font-medium"
                    />
                  )}
                />
            </div>
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pb-5')}>
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
                      color="info"
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
                      color="info"
                      error={errors?.city?.message as string}
                      getOptionValue={(option) => option.name}
                      dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                      className="font-medium"
                    />
                  )}
                />
                <Input
                  onKeyDown={handleKeyContactDown}
                  type="text"
                  label="Pin code"
                  placeholder="Enter pincode number"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('pincode')}
                  error={errors.pincode?.message}
                />
            </div>
            <div>
            <div className={cn('grid grid-cols-2 gap-5 pt-5')}>
              <div>
                <Button
                  variant="outline"
                  className="@xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
              </div>
              <div className='float-right text-right'>
                { title === 'New Client' &&
                  <Button
                    // type='submit'
                    className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={Object.keys(errors).length === 0 && loader && isSubmitSuccessful && !save}
                    onClick={() => {
                      handleSubmit(onSubmit)();
                      // console.log(errors, "errors....")
                      setLoader(true)
                    }}
                  >
                    Save & New
                    {Object.keys(errors).length === 0 && loader && isSubmitSuccessful && !save && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                  </Button>
                }
                <Button
                  type="submit"
                  className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                  disabled={(clientSliceData?.addClientStatus === 'pending' || clientSliceData?.editClientStatus === 'pending') && save}
                  onClick={handleSaveClick}

                >
                  Save
                  { (clientSliceData?.addClientStatus === 'pending' || clientSliceData?.editClientStatus === 'pending') && save && (<Spinner size="sm" tag='div' className='ms-3' color='white' />)  }
                </Button>
              </div>
            </div>
          </div>
          </div>
        )}
      </Form>
    </>
  );
  }
}
