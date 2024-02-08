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
} from '@/app/shared/(user)/invoice/invoice-list/form-utils';
import { AddInvoiceItems } from '@/app/shared/(user)/invoice/invoice-list/add-invoice-items';
import FormFooter from '@/components/form-footer';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';
import {
  getAllInvoiceDataTable,
  getInvoiceApi,
  getInvoiceData,
  getInvoiceDataByID,
  updateInvoice,
} from '@/redux/slices/user/invoice/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/redux/slices/user/auth/signinSlice';
import Spinner from '@/components/ui/spinner';
import { Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { FaArrowLeft } from 'react-icons/fa6';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';

const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];

export default function EditInvoice(){
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [client, setClient] = useState('');
  const params = useParams();
  console.log(params,'params.....')

  const dispatch = useDispatch();
  const router = useRouter();

  const invoiceSliceData = useSelector((state: any) => state?.root?.invoice);
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const data :any  = invoiceSliceData?.getInvoiceDataByIDdata?.data?.[0];
  
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvoiceApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvoiceDataByID({ _id: params.id }));
  }, [dispatch]);

  const datas = signIn?.userProfile;

  let receipentOptions: Record<string, string>[] = [];
  invoiceSliceData?.getInvoiceApidata !== '' &&
    invoiceSliceData?.getInvoiceApidata?.datas?.map(
      (client: Record<string, string>) => {
        receipentOptions.push({
          name: `${client?.name}(${client.company_name})`,
          value: client?._id,
        });
      }
    );
    
  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    const formated_due_date = moment(data.due_date , "ddd MMM DD YYYY HH:mm:ss").format("YYYY-MM-DD")
    const formated_invoice_date = moment(data.invoice_date , "ddd MMM DD YYYY HH:mm:ss").format("YYYY-MM-DD")
    const formData = {
      client_id: invoiceSliceData?.getInvoiceDataByIDdata?.data?.[0]?.to._id,
      invoice_id: params.id,
      due_date: formated_due_date,
      invoice_date: formated_invoice_date,
      invoice_content: data?.invoice_content
    };

    dispatch(updateInvoice(formData)).then((result: any) => {
      if (updateInvoice.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          router.replace(routes.invoice);
          dispatch(getAllInvoiceDataTable({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
        }
      }       
    });
  };

  const defaultValuess: InvoiceFormInput = {
    fromName: data?.from?.name ?? '',
    invoice_number: data?.invoice_number ?? '',
    fromAddress:`${data?.from?.address}, ${data?.from?.city.name}, ${data?.from?.state.name}, ${data?.from?.country.name}, ${data?.from?.pincode}` ?? '',
    fromPhone: data?.contact_number ?? '',
    client_id:`${data?.to?.name} (${data?.to?.company_name}) ` ?? '',
    name:data?.to?.name ?? '',
    toAddress: `${data?.to?.address}, ${data?.to?.city.name}, ${data?.to?.state.name}, ${data?.to?.country.name}, ${data?.to?.pincode}` ?? '',
    toPhone: '',
    status: '',
    invoice_date: new Date(),
    due_date: new Date(),
    invoice_content: data?.invoice_content,
  };

  if (Object?.keys(signIn?.userProfile)?.length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  }
   else {
    return (
      <Form<InvoiceFormInput>
        validationSchema={invoiceFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: defaultValuess,
          mode: 'all',
        }}
        className="flex flex-grow flex-col @container [&_label]:font-medium"
      >
        {({ register, control, watch, setValue, getValues, formState: { errors } }) => (
          <>
            <div className="flex-grow pb-10">
              <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
                <div className="flex w-full">
                  <div>
                    <FormBlockWrapper
                      title={'Edit Invoice'}
                      className="text-2xl"
                    ></FormBlockWrapper>
                  </div>
                  <div className="ml-[68%]">
                    <Link href={routes.invoice} className="w-full">
                      <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
                        <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                        Back
                      </Button>
                    </Link>
                  </div>
                </div>
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
                    disabled={true}
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
                        disabled={true}
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
                    disabled={true}
                  />
                </FormBlockWrapper>

                <FormBlockWrapper
                  title={'To:'}
                  description={'To he who will receive this invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Controller
                    name="client_id"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={receipentOptions}
                        value={value}
                        onChange={(selectedOption: any) => {
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
                        error={errors?.client_id?.message as string}
                        dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                        className="font-medium"
                        disabled={true}
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
                    disabled={true}
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
                    disabled={true}
                  />
                </FormBlockWrapper>

                <FormBlockWrapper
                  title={'Schedule:'}
                  description={'To he who will receive this invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-3">
                    <Input
                      type="text"
                      label="Invoice Number"
                      placeholder="Enter invoice number"
                      {...register('invoice_number')}
                      error={errors.invoice_number?.message}
                      disabled={true}
                    />
                    <div className="[&>.react-datepicker-wrapper]:w-full">
                      <Controller
                        name="invoice_date"
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
                        name="due_date"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            inputProps={{
                              label: 'Due Date',
                              error: errors?.due_date?.message,
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
              {/* <Button
                    type="submit"
                    className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={adminFaq?.loading}
                  >
                    Save
                    {adminFaq?.loading && (
                        <Spinner
                          size="sm"
                          tag="div"
                          className="ms-3"
                          color="white"
                        />
                      )}
                  </Button> */}
            </div>

            <FormFooter
              isLoading={isLoading}
              submitBtnText={params.id?'Update Invoice' : 'Create Invoice'}
            />
          </>
        )}
      </Form>
    );
  }
}
