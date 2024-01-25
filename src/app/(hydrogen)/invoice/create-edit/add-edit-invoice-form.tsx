'use client';

import { useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Title, Text, ActionIcon } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/datepicker';
import Select from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PiEyeFill, PiNotePencilDuotone, PiPlusBold, PiXBold } from 'react-icons/pi';
import { Button } from 'rizzui';

interface TableItem {
  item: string;
  qty: any;
  rate: any;
  tax: any;
}
interface FormData {
  createDate: Date;
  dueDate: Date;
}
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
  const dispatch = useDispatch();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  let data = clientSliceData?.client;
  const [image, setImage] = useState(
    !!data?.image
      ? data?.image
      : 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp'
  );

  const [regionalData, setRegionalData] = useState({
    city: data?.client?.city?.id,
    state: data?.client?.state?.id,
    country: data?.client?.country?.id,
  });
  let stateOptions: Record<string, string>[] = [];

  clientSliceData?.states !== '' &&
    clientSliceData?.states?.map((state: Record<string, string>) => {
      stateOptions.push({ name: state?.name, value: state?.name });
    });
  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    toast.success(
      <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        fromName: '',
        fromAddress: '',
        fromPhone: '',
        toName: '',
        toAddress: '',
        toPhone: '',
        shipping: '',
        discount: '',
        taxes: '',
        createDate: new Date(),
        status: 'draft',
        items: invoiceItems,
      });
    }, 600);
  };

  const newItems = record?.items
    ? record.items.map((item) => ({
        ...item,
      }))
    : invoiceItems;

  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [avtar, setAvatar] = useState<string |ArrayBuffer| null>(null);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  const { setValue } = useForm();
  
  const handleEditClick = () => {
    setIsOpenEditMode(!isOpenEditMode);
    setIsUploadFileOpen(true);
  };
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setValue('fileInputName', file);
      const reader = new FileReader();
      const files = event.target.files;
    
      if (files.length > 0) {
        const file = files[0];
    
        if (file.size <= 100 * 1024 * 5000000) {
          setValue('fileInputName', file);
    
          reader.onload = function () {
            setAvatar(reader.result);
          };
    
          reader.readAsDataURL(file);
        } else {
          toast.error('File size exceeds the allowed limit (100 KB). Please select a smaller file.')
          event.target.value = null;
        }
      }
    }; 
  const handleInputChange = (index: number, field: string, value: string) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    }); 
  };
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const handlePreviewClick = () => {
    setIsPreviewMode(true);
  };

  const initialData: TableItem[] = [
    {
      item: '',
      qty: '',
      rate: '',
      tax: '',
    },
  ];
  const [tableData, setTableData] = useState<TableItem[]>(initialData);
  const [subtotal, setSubtotal] = useState<number>(0);

  const calculateAmountWithTax = (
    qty: any,
    rate: any,
    tax: any
  ): string => {
    const subTotal = qty * rate;
    const totalAmount = subTotal + subTotal * tax;
    return totalAmount.toFixed(2);
  };

  const calculateSubtotal = (): number => {
    let subTotal = 0;
    tableData.forEach((item) => {
      subTotal += item.qty * item.rate;
    });
    setSubtotal(subTotal);
    return subTotal;
  };

  const calculateTotal = (): string => {
    const subTotal = calculateSubtotal();
    const totalAmount = subTotal + subTotal * (tableData[0]?.tax || 0);
    return totalAmount.toFixed(2);
  };
  const handleAddItem = () => {
    setTableData((prevData) => [
      ...prevData,
      {
        item: '',
        qty: '',
        rate: '',
        tax: '',
      },
    ]);
  };
  const handleRemoveItem = (index: number) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newItem: TableItem = {
      item: formData.get('item') as string,
      qty: parseInt(formData.get('qty') as string, 10),
      rate: parseFloat(formData.get('rate') as string),
      tax: parseFloat(formData.get('tax') as string),
    };
  };

  return (
    <Form<InvoiceFormInput>
      validationSchema={invoiceFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
          invoiceNumber: 'INV-0071',
          createDate: new Date(),
          // status: 'draft',
          items: newItems,
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="flex-grow bg-slate-50 pb-10">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <Title>Invoice Info</Title>
              <div className="flex gap-10">
                {/* left side form page*/}
                {isPreviewMode ? null : (
                  <div className="mt-5 h-[43rem] w-[18rem] rounded-lg bg-white p-2 shadow dark:divide-gray-600">
                    <Controller
                      name="Recipient"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          options={stateOptions}
                          value={value}
                          onChange={(selectedOption: string) => {
                            onChange(selectedOption);
                            // stateHandleChange(selectedOption);
                          }}
                          label="Recipient"
                          // disabled={stateOptions.length === 0}
                          error={errors?.Recipient?.message as string}
                          getOptionValue={(option) => option.name}
                          // dropdownclassName="p-1 border w-12 border-gray-100 shadow-lg"
                          className="font-medium"
                        />
                      )}
                    />
                    <Controller
                      name="createDate"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <DatePicker
                          inputProps={{
                            label: 'Invoice Date',
                            error: errors?.createDate?.message, // Add error handling if needed
                          }}
                          placeholderText="Select Date"
                          selected={invoiceDate}
                          onChange={(date: Date | null) => {
                            setInvoiceDate(date);
                            onChange(date);
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="dueDate"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <DatePicker
                          inputProps={{
                            label: 'Due Date',
                            error: errors?.dueDate?.message, // Add error handling if needed
                          }}
                          placeholderText="Select Date"
                          selected={dueDate}
                          onChange={(date: Date | null) => {
                            setDueDate(date);
                            onChange(date);
                          }}
                        />
                      )}
                    />
                  </div>
                )}
                {/* right side form page*/}
                <div
                  className="z-10 mt-5 h-full w-full divide-y divide-gray-100 rounded-lg bg-white p-2 
                shadow dark:divide-gray-600 dark:bg-gray-700"
                >
                  {/* header image and invoice*/}
                  <div className="mt-5 flex rounded-md border border-solid border-gray-200 p-2">
                    <img
                      src={avtar ? avtar : image}
                      alt="Image"
                      color="invert"
                      height={20}
                      width={40}
                      className="rounded-md"
                    />
                    <div
                      style={{ position: 'relative', display: 'inline-block' }}
                    >
                      <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={handleEditClick}
                        className="p-0 text-gray-500 hover:!text-gray-900"
                      >
                        <PiNotePencilDuotone className="h-[18px] w-[18px]" />
                      </ActionIcon>
                      <input
                        type="file"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          opacity: 0,
                          cursor: 'pointer',
                          width: 20,
                          height: 40,
                        }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="Invoice number"
                      color="info"
                      className="ml-auto w-40"
                      {...register('invoice_number')}
                      error={errors.invoice_number?.message}
                      maxLength={10}
                      minLength={2}
                    />
                  </div>
                  {/* to and from section */}
                  <div className="mt-3 flex w-full flex-col justify-start p-1 md:flex-row md:justify-between">
                    <div className=" text-lg">
                      <h3 className="py-2">TO</h3>
                      <Text>First name</Text>
                      <Text>Address</Text>
                      <Text>City</Text>
                      <Text>State</Text>
                      <span className="flex">
                        <Text>Country</Text>
                        <Text>PinCode</Text>
                      </span>
                    </div>
                    <div className="text-left text-lg md:text-right">
                      <h3 className="py-2">FROM</h3>
                      <Text>First name</Text>
                      <Text>Address</Text>
                      <Text>City</Text>
                      <Text>State</Text>
                      <span className="flex">
                        <Text>Country</Text>
                        <Text>PinCode</Text>
                      </span>
                    </div>
                  </div>
                  {/*invoice date and due date */}
                  <div className="flex flex-col justify-start py-3 md:flex-row md:justify-between">
                    <div className="flex">
                      <h4>Invoice date:</h4>
                      <h4>
                        {invoiceDate
                          ? invoiceDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                      </h4>
                    </div>
                    <div className="flex">
                      <h4>Due date:</h4>
                      <h4>{dueDate ? dueDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }) : ''}</h4>
                    </div>
                  </div>
                  {/* table */}
                  <div>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Item
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Rate
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Tax
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                                <input
                                  className="rounded-lg"
                                  type="text"
                                  placeholder="Enter item"
                                  value={item.item}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'item',
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4">
                                <input
                                  className="rounded-lg"
                                  type="number"
                                  placeholder="Enter quantity"
                                  value={item.qty}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'qty',
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4">
                                <input
                                  className="rounded-lg"
                                  type="number"
                                  placeholder="Enter Rate here"
                                  value={item.rate}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'rate',
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4">
                                <input
                                  className="rounded-lg"
                                  type="number"
                                  placeholder="Enter Tax"
                                  value={item.tax}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'tax',
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4">
                                {calculateAmountWithTax(
                                  item.qty,
                                  item.rate,
                                  item.tax
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <PiPlusBold
                                  className="me-1.5 h-4 w-4 cursor-pointer"
                                  onClick={handleAddItem}
                                />
                              </td>
                              {tableData.length > 1 && (
                                <td className="px-6 py-4">
                                  <PiXBold
                                    className={`me-1.5 h-4 w-4 cursor-pointer ${
                                      tableData.length === 1
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                    }`}
                                    onClick={() => handleRemoveItem(index)}
                                  />
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* sub total */}
                  <div className="mr-8 py-2">
                    <h4 className="text-left text-lg md:text-right">
                      Subtotal: Rs. {calculateSubtotal()}
                    </h4>
                  </div>
                  {/* total */}
                  <div className="mr-8 pt-2">
                    <h4 className="text-left text-lg md:text-right">
                      Total: Rs. {calculateTotal()}
                    </h4>
                  </div>
                  {/* save send preview button */}
                  {!isPreviewMode && (
                    <div className="float-end py-2">
                      <Button
                        type="submit"
                        className="mt-2 border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none"
                        onClick={handlePreviewClick}
                        // disabled={adminFaq?.loading}
                      >
                        <PiEyeFill className="mr-3 h-[18px] w-[18px]" />
                        preview
                        {/* {adminFaq?.loading && (<Spinner size="sm" tag="div" className="ms-3" color="white" /> */}
                      </Button>
                      <Button
                        type="submit"
                        className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                        // disabled={adminFaq?.loading}
                      >
                        Save
                        {/* {adminFaq?.loading && (<Spinner size="sm" tag="div" className="ms-3" color="white" /> */}
                      </Button>
                      <Button
                        type="submit"
                        className="ms-3 border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none"
                        // disabled={adminFaq?.loading}
                      >
                        Send
                        {/* {adminFaq?.loading && (<Spinner size="sm" tag="div" className="ms-3" color="white" /> */}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Form>
  );
}
