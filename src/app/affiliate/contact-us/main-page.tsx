'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';

import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '@/redux/slices/user/auth/signinSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';
import { login } from '@/redux/slices/affiliate/authSlice';
import { ContactusSchema, contactusSchema } from '@/utils/validators/affiliate/contact-us.schema';

const initialValues: ContactusSchema = {
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    country: '',
    no_of_people: '',
    thoughts: '',
    isAgreedtosyncup: false,
};

export default function ContactusForm() {
    const isMedium = useMedia('(max-width: 1200px)', false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state: any) => state?.root?.auth)


    const onSubmit: SubmitHandler<ContactusSchema> = (data) => {
        console.log(data, 'data')
        // dispatch(login(data)).then((result: any) => {
        //     if (login.fulfilled.match(result)) {
        //         // console.log(result, 'result', result?.payload?.data?.user?.status, result?.payload?.data?.user?.role?.name)
        //         if (result && result.payload.success === true) {
        //             // router.replace(routes.dashboard);

        //         }
        //     }
        // })
    };

    return (
        <>
            <Form<ContactusSchema>
                validationSchema={contactusSchema}
                onSubmit={onSubmit}
                // resetValues={reset}
                useFormProps={{
                    mode: 'onTouched',
                    defaultValues: initialValues,
                }}
            >
                {({ register, formState: { errors } }) => (
                    console.log(errors,'errors'),
                    <div className="space-y-5">
                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="*First Name:"
                            placeholder="Enter First name"
                            rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('first_name')}
                            error={errors?.first_name?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="*Last Name:"
                            placeholder="Enter Last name"
                            rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('last_name')}
                            error={errors?.last_name?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="email"
                            label="Email"
                            placeholder="Enter Company mail"
                            rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('email')}
                            error={errors?.email?.message}
                        />
                        <Input
                            onKeyDown={handleKeyDown}
                            type="number"
                            label="*Phone number:"
                            placeholder="Enter Phone number"
                            color="info"
                            className="[&>label>span]:font-medium"
                            {...register('contact_number')}
                            error={errors.contact_number?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="Country:"
                            placeholder="Enter Country"
                            rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('country')}
                            error={errors?.country?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="number"
                            label="Company size:"
                            placeholder="Enter Company size"
                            rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('no_of_people')}
                            error={errors?.no_of_people?.message}
                        />

                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            label="*Share your thoughts and let's dive into a meaningful discussion."
                            placeholder="Enter here"
                            rounded="pill"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('thoughts')}
                            error={errors?.thoughts?.message}
                        />

                        <Checkbox
                            {...register('isAgreedtosyncup')}
                            label={`By checking the box and clicking " Submit", you are agreeing to Syncupp's Privacy Statemen.`}
                            color="info"
                            variant="flat"
                            className="[&>label>span]:font-medium"
                            error={errors.isAgreedtosyncup?.message}
                        />
                        <Button
                            className="w-full border-2 text-base font-bold"
                            type="submit"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            rounded="pill"
                            disabled={loading}
                        >
                            SUBMIT
                            {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}
