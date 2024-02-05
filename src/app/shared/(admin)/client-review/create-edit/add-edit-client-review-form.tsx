'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect } from 'react';
import { Textarea } from 'rizzui';
import { ClientReviewSchema, clientReviewSchema } from '@/utils/validators/client-review.schema copy';
import { getAllClientReview, getClientReviewDataByID, postClientReviewEnroll, updateClientReviewDataByID } from '@/redux/slices/admin/clientReview/clientReviewSlice';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function AddClientReviewForm(props: any) {
  const { title, row } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const adminClientReview = useSelector((state: any) => state?.root?.adminClientReview);
  // let data = row;
  let initialValues: ClientReviewSchema = {
    client_review_image:"",
    customet_name: "",
    company_name: "",
    review: "",
  }; 

  useEffect(() => {
    row && dispatch(getClientReviewDataByID({ _id: row?._id }))
  }, [row, dispatch]); 

  let data = adminClientReview?.clientReviewData;
  
  let defaultValuess = {
    client_review_image: data?.client_review_image,
    customet_name: data?.customet_name,
    company_name: data?.company_name,
    review: data?.review,
  };

  const onSubmit: SubmitHandler<ClientReviewSchema> = (data) => {

    const filteredFormData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== '')
    );

    if(title === 'Client Review') {
        dispatch(postClientReviewEnroll(filteredFormData)).then((result: any) => {
          if(postClientReviewEnroll.fulfilled.match(result)) {
            if (result && result.payload.success === true) {
              closeModal();
              dispatch(getAllClientReview());
            }
          }
        });
    } else {
      dispatch(updateClientReviewDataByID({...filteredFormData,_id:row._id})).then((result: any) => {
        if(updateClientReviewDataByID.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            closeModal();  
            dispatch(getAllClientReview());
          }
        }
      });
    }
  };
  
  if(!adminClientReview?.faqData && title === 'Edit Client Review') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
  return (
    <>
      <Form<ClientReviewSchema>
        validationSchema={clientReviewSchema}
        onSubmit={onSubmit}
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
            <div className={cn('grid grid-cols-1 gap-4')}>
              <input
                type="file"
                // label="Upload Image"
                color="info"
                className="[&>label>span]:font-medium"
                // {...register('image')}
                // error={errors?.image?.message}
              />
              <Input
                type="text"
                label="Customer Name"
                placeholder="Enter Customer Name here....."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('customet_name')}
                error={errors?.customet_name?.message}
              />
              <Input
                type="text"
                label="Company Name"
                placeholder="Enter Customer Name here....."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('company_name')}
                error={errors?.company_name?.message}
              />
            </div>
            <div>
              <Textarea
                label="Review"
                placeholder="Describe your Content Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('review')}
                error={errors?.review?.message}
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
                    disabled={adminClientReview?.loading}
                  >
                    Save
                    {adminClientReview?.loading && (
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
