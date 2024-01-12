'use client';

import { Title } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';
import { useDispatch, useSelector } from 'react-redux';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiCreditCardDuotone, PiNotePencilDuotone, PiXBold } from 'react-icons/pi';
import { ActionIcon, Avatar } from 'rizzui';
import cn from '@/utils/class-names';
import { AdminEditProfileSchema, adminEditProfileSchema } from '@/utils/validators/admin-edit-profile.schema';
import  { postEditProfile } from '@/redux/slices/admin/auth/viewprofile/viewProfileSlice';
import Spinner from '@/components/ui/spinner';


export default function ViewProfileForm(props:any) {
  const { data } = props;
  // const[formData]= data;
  
  console.log(props.data,'props.data........')
  
  const initialValues = {
    email:data?.email??'',
    first_name:data?.first_name?? '',
    last_name:data?.last_name?? '',
    contact_no: data?.contact_no??''
  };
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [image, setImage] = useState(!!data?.image ? data?.image : 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp');
  const { closeModal } = useModal();
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const router = useRouter();
  const viewProfile = useSelector((state: any) => state?.root?.viewProfile)
  console.log("viewProfile state.....", viewProfile)

  const onSubmit: SubmitHandler<AdminEditProfileSchema> = (data) => {
    dispatch(postEditProfile(data)).then((result: any) => {
      if (postEditProfile.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.admin.dashboard);
        } 
      }
    })
    // setReset({ ...initialValues });
  };

  return (
    <>
      <Form<AdminEditProfileSchema>
        validationSchema={adminEditProfileSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className=" [&_label]:font-medium p-10"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                View Profile
              </Title>
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
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
              </span>
            </div>
            <div className='text-center'>
            <img
          src={image}
          alt="Albert Flores"
          color="invert"
          height={100}
          width={100}
        /></div>
            <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Email"
                placeholder="Enter Your email"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
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
            <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Contact Number"
                placeholder="Enter Contact Number"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact_no')}
                error={errors.contact_no?.message}
                disabled={!isOpenEditMode}
              />
              {isOpenEditMode && (
            <div className={cn('grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover:gray-700 w-full  @xl:w-auto dark:bg-gray-200 dark:text-white"
                  disabled={viewProfile.loading}
                >
                  Save
                  {viewProfile.loading && <Spinner size="sm" tag='div' className='ms-3' />}
                </Button>
              </div>
              )}
          </div>
        )}
      </Form>
    </>
  );
}
