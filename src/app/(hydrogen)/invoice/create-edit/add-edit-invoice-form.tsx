'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneNumber } from '@/components/ui/phone-input';
import { DatePicker } from '@/components/ui/datepicker';
import Select from '@/components/ui/select';
import {
  FormBlockWrapper,
  statusOptions,
} from '@/app/shared/(user)/invoice/invoice-list/form-utils';
import { AddInvoiceItems } from '@/app/shared/(user)/invoice/invoice-list/add-invoice-items';
import FormFooter from '@/components/form-footer';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';
import {
  getInvoiceApi,
  getInvoiceData,
  postCreateInvoice,
} from '@/redux/slices/user/invoice/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/redux/slices/user/auth/signinSlice';
import Spinner from '@/components/ui/spinner';

const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];

export default function CreateInvoice({
  id,
  record,
}: {
  id?: string;
  record?: InvoiceFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [client, setClient] = useState('');
  const dispatch = useDispatch();
  const invoiceSliceData = useSelector((state: any) => state?.root?.invoice);
  const signIn = useSelector((state: any) => state?.root?.signIn);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvoiceApi());
  }, [dispatch]);

  const data = signIn?.userProfile;

  let receipentOptions: Record<string, string>[] = [];
  invoiceSliceData?.getInvoiceApidata !== '' &&
    invoiceSliceData?.getInvoiceApidata?.data?.map(
      (client: Record<string, string>) => {
        receipentOptions.push({
          name: `${client?.name}(${client.company_name})`,
          value: client?._id,
        });
      }
    );

  // const fetchRecipientDetails = async (recipientId: string) => {
  //   try {
  //     dispatch(getInvoiceData({ client_id: selectedOption?.value }));
  //     const response = invoiceSliceData.getInvoiceData.data;

  //     // Update toPhone and toAddress fields with fetched data
  //     setValue('toPhone', response.contact_number);
  //     setValue(
  //       'toAddress',
  //       `${response.address}, ${response.city.name}, ${response.state.name}, ${response.country.name}, ${response.pincode}`
  //     );
  //   } catch (error) {
  //     console.error('Error fetching recipient details:', error);
  //   }
  // };

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {

    const formData = {
      ...data,
      name: client,
      createDate: new String(data?.createDate),
      dueDate: new String(data?.dueDate),
    }

    dispatch(postCreateInvoice(formData)).then((result: any) => {
      if (postCreateInvoice.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          // dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
        }
      }
    });



    // toast.success(
    //   <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    // );
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log('createInvoice data ->', data);
    //   setReset({
    //     fromName: '',
    //     fromAddress: '',
    //     fromPhone: '',
    //     toName: '',
    //     toAddress: '',
    //     toPhone: '',
    //     shipping: '',
    //     discount: '',
    //     taxes: '',
    //     createDate: new Date(),
    //     status: 'draft',
    //     items: invoiceItems,
    //   });
    // }, 600);
  };

  const newItems = record?.items
    ? record.items.map((item) => ({
        ...item,
      }))
    : invoiceItems;

  const defaultValuess: InvoiceFormInput = {
    ...record,
    fromName: data?.first_name ?? '',
    invoice_number: '',
    fromAddress: data?.reference_id?.address ?? '',
    fromPhone: data?.contact_number ?? '',
    name: '',
    toAddress: '',
    toPhone: '',
    invoiceNumber: '',
    // Recipient: new Date(),
    status: '',
    taxes: 0,
    createDate: new Date(),
    dueDate: new Date(),
    // status: 'draft',
    items: [{ item: '', description: '', quantity: 1, price: 0 }],
  };
  if (Object.keys(signIn?.userProfile).length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <Form<InvoiceFormInput>
        validationSchema={invoiceFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: defaultValuess,
        }}
        className="flex flex-grow flex-col @container [&_label]:font-medium"
      >
        {({ register, control, watch, setValue, formState: { errors } }) => (
          <>
            <div className="flex-grow pb-10">
              <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
                <FormBlockWrapper
                  title={'Create Invoice'}
                  className="text-2xl"
                ></FormBlockWrapper>
                <FormBlockWrapper
                  title={'From:'}
                  description={'From he who sending this invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    {...register('fromName')}
                    error={errors.fromName?.message}
                  />
                  <Controller
                    name="fromPhone"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <PhoneNumber
                        label="Phone Number"
                        country="us"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Textarea
                    label="Address"
                    placeholder="Enter your address"
                    {...register('fromAddress')}
                    error={errors.fromAddress?.message}
                    textareaClassName="h-20"
                    className="col-span-2"
                  />
                </FormBlockWrapper>

                <FormBlockWrapper
                  title={'To:'}
                  description={'To he who will receive this invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={receipentOptions}
                        value={value}
                        onChange={(selectedOption: any) => {
                          console.log(selectedOption, 'afasasfasfafasfsafafs');
                          onChange(selectedOption?.name);
                          setClient(selectedOption?.value);
                          dispatch(
                            getInvoiceData({ client_id: selectedOption?.value })
                          ).then((result: any) => {
                            if (getInvoiceData.fulfilled.match(result)) {
                              if (result && result.payload.success === true) {
                                setValue(
                                  'toPhone',
                                  result.payload.data.contact_number
                                );
                                setValue(
                                  'toAddress',
                                  `${result.payload.data.address}, ${result.payload.data.city.name}, ${result.payload.data.state.name}, ${result.payload.data.country.name}, ${result.payload.data.pincode}`
                                );
                              }
                            }
                          });
                        }}
                        label="Name"
                        error={errors?.name?.message as string}
                        dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                        className="font-medium"
                      />
                    )}
                  />
                  <Controller
                    name="toPhone"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <PhoneNumber
                        label="Phone Number"
                        country="us"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Textarea
                    label="Address"
                    placeholder="Enter your address"
                    {...register('toAddress')}
                    error={errors.toAddress?.message}
                    textareaClassName="h-20"
                    className="col-span-2"
                  />
                </FormBlockWrapper>

                <FormBlockWrapper
                  title={'Schedule:'}
                  description={'To he who will receive this invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-3">
                    <Input
                    type='text'
                      label="Invoice Number"
                      placeholder="Enter invoice number"
                      {...register('invoiceNumber')}
                      error={errors.invoiceNumber?.message}
                    />
                    <div className="[&>.react-datepicker-wrapper]:w-full">
                      <Controller
                        name="createDate"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            inputProps={{ label: 'Date Create' }}
                            placeholderText="Select Date"
                            selected={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </div>
                    <div className="[&>.react-datepicker-wrapper]:w-full">
                      <Controller
                        name="dueDate"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            inputProps={{
                              label: 'Due Date',
                              error: errors?.dueDate?.message,
                            }}
                            placeholderText="Select Date"
                            selected={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </FormBlockWrapper>

                <AddInvoiceItems
                  watch={watch}
                  control={control}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            <FormFooter
              isLoading={isLoading}
              submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
            />
          </>
        )}
      </Form>
    );
  }
}
