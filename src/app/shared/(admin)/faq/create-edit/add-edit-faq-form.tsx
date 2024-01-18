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
import { ClientSchema, clientSchema } from '@/utils/client-schema';
import { RemoveRegionalData, getAllClient, getCities, getClientById, getCountry, getState, patchEditClient, postAddClient } from '@/redux/slices/user/client/clientSlice';
import { useEffect, useState } from 'react';
import { FaqSchema, faqSchema } from '@/utils/validators/faq.schema';
import QuillEditor from '@/components/ui/quill-editor';
import { Textarea } from 'rizzui';
import { PostFaqEnroll } from '@/api/auth/faq/faqApis';
import { postAddFaq } from '@/redux/slices/admin/faq/faqSlice';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});


export default function AddFaqForm(props: any) {

  const { title, row } = props;
  // console.log("row data...", row)
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();
  const adminFaq = useSelector((state: any) => state?.root?.adminFaq);
  
  const [save, setSave] = useState(false)
  const [reset, setReset] = useState({})

  // let data = row;
  let initialValues: FaqSchema = {
    title: "",
    description: "",
  }; 
   


  // useEffect(() => {
  //   row && dispatch(getClientById({ clientId: row?._id }))
  // }, [row, dispatch]); 

  let data = adminFaq?.adminFaq;
  
  let defaultValuess = {
    title: data?.title,
    description: data?.description,
  };

  // console.log("defaultValues...", defaultValuess);

  
  // useEffect(() => {

  //   if(title === 'Edit Client' && clientSliceData?.client){

  //      initialValues = {
  //       name: data?.name ?? "",
  //       email: data?.email ?? "",
  //       company_name: data?.client?.company_name ?? "",
  //       company_website: data?.client?.company_website ?? "",
  //       address: data?.address ?? "",
  //       city: data?.city ?? undefined,
  //       state: data?.state ?? undefined,
  //       country: data?.country ?? undefined,
  //       pincode: data?.pincode ?? "",
  //       title: data?.title ?? "",
  //       contact_number: data?.contact_number ?? ""
  //     }; 
      
  //     Object?.entries(initialValues)?.forEach(([key, value]) => {
  //       setValue(key, value);
  //     });
  //   }

  // }, [clientSliceData, title]);
  
  // let data = clientSliceData?.client;



  // const [regionalData, setRegionalData] = useState({
  //   city: data?.client?.city?.id,
  //   state: data?.client?.state?.id,
  //   country: data?.client?.country?.id
  // });  
  // console.log("Regional Data....", regionalData)

  // let countryOptions: Record<string, string>[] = [];

  // clientSliceData?.countries !== '' && clientSliceData?.countries?.map((country: Record<string, string>) => {
  //   countryOptions.push({ name: country?.name, value: country?.name }) 
  // })
  
  // const countryHandleChange = (selectedOption: string) => {
  //   const [ countryObj ] = clientSliceData?.countries?.filter((country: Record<string, string>) => country?.name === selectedOption )
  //   dispatch(getState({ countryId: countryObj._id }))
  //   setRegionalData({...regionalData, country: countryObj._id})
  // };

  // let stateOptions: Record<string, string>[] = [];

  // clientSliceData?.states !== '' && clientSliceData?.states?.map((state: Record<string, string>) => {
  //   stateOptions.push({ name: state?.name, value: state?.name }) 
  // })

  // const stateHandleChange = (selectedOption: string) => {
  //   const [ stateObj ] = clientSliceData?.states?.filter((state: Record<string, string>) => state?.name === selectedOption )
  //   dispatch(getCities({ stateId: stateObj._id }))
  //   setRegionalData({...regionalData, state: stateObj._id})
  // };

  // let cityOptions: Record<string, string>[] = [];

  // clientSliceData?.cities !== '' && clientSliceData?.cities?.map((city: Record<string, string>) => {
  //   cityOptions.push({ name: city?.name, value: city?.name }) 
  // })

  // const cityHandleChange = (selectedOption: string) => {
  //   const [ cityObj ] = clientSliceData?.cities?.filter((city: Record<string, string>) => city?.name === selectedOption )
  //   setRegionalData({...regionalData, city: cityObj._id})
  // };



  const handleSaveClick = () => {
    // console.log("save button clicked")
    setSave(true);
  }

  const onSubmit: SubmitHandler<FaqSchema> = (dataa) => {
    // console.log('Add client dataa---->', dataa);

    const formData = {
      description: dataa?.description ?? '',
      title: dataa?.title ?? '',
    }

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );


    // const filteredRegionalData = Object.fromEntries(
    //   Object.entries(regionalData).filter(([_, value]) => value !== undefined && value !== '')
    // );

    // const fullData = { ...filteredRegionalData, ...filteredFormData }

    if(title === 'New FAQ') {
      // dispatch(postAddClient(fullData)).then((result: any) => {
        dispatch(postAddFaq()).then((result: any) => {
          if(postAddFaq.fulfilled.match(result)) {
            if (result && result.payload.success === true) {
              save && closeModal();
              setSave(false);
            }
          }
        });
    } else {
      // dispatch(patchEditClient({ ...fullData, clientId: data._id })).then((result: any) => {
      dispatch(patchEditClient()).then((result: any) => {
        if(patchEditClient.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            save && closeModal();
            setSave(false);
          }
        }
      });
    }

    
  };
  
  if(!adminFaq?.client && title === 'Edit Client') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
  return (
    <>
      <Form<FaqSchema>
        validationSchema={faqSchema}
        onSubmit={onSubmit}
        resetValues={reset}
        useFormProps={{
          mode: 'onChange',
          defaultValues: defaultValuess,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors }, setValue }) => (
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
            <div
              className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
              )}
            >
              <Input
                // onKeyDown={handleKeyDown}
                type="text"
                label="Title"
                placeholder="Enter your Title here....."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('title')}
                error={errors?.title?.message}
              />
            </div>
            <div>
              <Textarea
                label="Description"
                placeholder="Describe your Content Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('description')}
                error={errors?.description?.message}
              />
            </div>
            <div>
              <div className={cn('grid grid-cols-2 gap-2 pt-5')}>
                <div>
                  <Button
                    variant="outline"
                    className="@xl:w-auto dark:hover:border-gray-400"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={
                      (adminFaq?.addFaqStatus === 'pending' ||
                        adminFaq?.editFaqStatus === 'pending') &&
                      save
                    }
                    onClick={handleSaveClick}
                  >
                    Save
                    {(adminFaq?.addFaqStatus === 'pending' ||
                      adminFaq?.editFaqStatus === 'pending') &&
                      save && (
                        <Spinner
                          size="sm"
                          tag="div"
                          className="ms-3"
                          color="white"
                        />
                      )}
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
