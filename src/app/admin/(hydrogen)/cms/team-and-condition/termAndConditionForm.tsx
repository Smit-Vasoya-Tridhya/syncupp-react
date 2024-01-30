'use client';

import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import { TermsAndConditionSchema, termsAndConditionSchema } from '@/utils/validators/terms-condition.schema';
import QuillEditor from '@/components/ui/quill-editor';


const initialValues: TermsAndConditionSchema = {
    title: '',
    description: '',
};

export default function TermsAndConditionFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [formdata, setformData] = useState({
    title: '',
    description: '',
})

  const termAndCondition = useSelector((state: any) => state?.root?.changePassword)

  const initialValues: TermsAndConditionSchema = {
    title: formdata?.title,
    description: formdata?.description,
};
  const onSubmit: SubmitHandler<TermsAndConditionSchema> = (data) => {

    const formData = {
      title: data?.title,
      Description: data?.description,
    }
    // dispatch(changePasswordUser(formData)).then((result: any) => {
    //   if (changePasswordUser.fulfilled.match(result)) {
    //     if (result && result.payload.success === true ) {
    //       // router.replace(routes.dashboard);
    //       closeModal();
    //     } 
    //   }
    // })
  };

  return (
    <>
      <Form<TermsAndConditionSchema>
        validationSchema={termsAndConditionSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className=" [&_label]:font-medium p-10"
      >
        {({ register,control, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                Terms & Conditions
              </Title>
            </div>
            <Input
              type="text"
              label="Title"
              placeholder="Enter your Title here..."
              color="info"
              className="[&>label>span]:font-medium"
              {...register('title')}
              error={errors.title?.message}
            />
            <Controller
                                control={control}
                                name="description"
                                render={({ field: { onChange, value } }) => (
                                    <QuillEditor
                                        value={value}
                                        onChange={onChange}
                                        label="Description"
                                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                    />
                                )}
                            />
            <div className={cn('grid grid-cols-2 gap-4 pt-5 float-end')}>
                <Button
                  variant="outline"
                  className="@xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                  disabled={termAndCondition.loading}
                >
                  Save
                  {termAndCondition.loading && <Spinner size="sm" tag='div' className='ms-3' />}
                </Button>
              </div>
          </div>
        )}
      </Form>
    </>
  );
}
