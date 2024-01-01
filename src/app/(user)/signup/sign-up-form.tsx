'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpForm(props: any) {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});

  const { setTitle, setNextBtn, setFormData  } = props;

  // console.log(formData)


  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    setFormData(data);
    setNextBtn(true);
    setTitle('Company Detail');
    console.log('sign up form data', data);
    setReset({ ...initialValues });
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="First Name"
                placeholder="Enter First Name"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="Last Name"
                placeholder="Enter Last Name"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('lastName')}
                error={errors?.lastName?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Input
                type="email"
                size={isMedium ? 'lg' : 'xl'}
                label="Email ID"
                placeholder="Enter your email"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="Contact Number"
                placeholder="Enter your email"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact')}
                error={errors.contact?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Password
                label="Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                label="Confirm Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
            <div className='w-full'>
              <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base float-start">
                Already have an account?{' '}
                <Link
                  href={routes.signIn}
                  className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                  Sign In
                </Link>
              </Text>
              <Button
                className="border-2 border-primary-light text-base font-medium float-end"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Form>
      
    </>
  );
}
