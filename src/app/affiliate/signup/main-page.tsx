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
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '@/redux/slices/user/auth/signinSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';
import { SignUpSchema, signUpSchema } from '@/utils/validators/affiliate/signup.schema';

const initialValues: SignUpSchema = {
    name: "",
    email: "",
    company_name: "",
    password: "",
    confirmPassword: "",
    isAgreedtoemail: false,
    isAgreedtotems: false,
};

export default function RegisterPage() {
    const isMedium = useMedia('(max-width: 1200px)', false);
    const dispatch = useDispatch();
    const router = useRouter();
    const signIn = useSelector((state: any) => state?.root?.signIn)

    const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
        console.log(data, 'data')
        // dispatch(signInUser(data)).then((result: any) => {
        //     if (signInUser.fulfilled.match(result)) {
        //         // console.log(result, 'result', result?.payload?.data?.user?.status, result?.payload?.data?.user?.role?.name)
        //         if (result && result.payload.success === true) {
        //             // router.replace(routes.dashboard);
        //             if (result?.payload?.data?.user?.status === "payment_pending" && result?.payload?.data?.user?.role?.name === "agency") {
        //                 initiateRazorpay(router, routes.dashboard, result?.payload?.data?.token, dispatch)
        //             } else {
        //                 router.replace(routes.dashboard);
        //             }
        //         }
        //     }
        // })
        // setReset({ ...initialValues, rememberMe: false });
    };

    return (
        <>
            <Form<SignUpSchema>
                validationSchema={signUpSchema}
                onSubmit={onSubmit}
                // resetValues={reset}
                useFormProps={{
                    mode: 'onTouched',
                    defaultValues: initialValues,
                }}
            >
                {({ register, formState: { errors } }) => (

                    console.log(errors, 'errors'),

                    <div className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                            <Input
                                onKeyDown={handleKeyDown}
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                rounded="pill"
                                color="info"
                                size={isMedium ? 'lg' : 'xl'}
                                className="[&>label>span]:font-medium"
                                {...register('email')}
                                error={errors?.email?.message}
                            />
                            <Input
                                onKeyDown={handleKeyDown}
                                type="text"
                                size={isMedium ? 'lg' : 'xl'}
                                label="First Name"
                                placeholder="Enter first name"
                                rounded="pill"
                                color="info"
                                className="[&>label>span]:font-medium"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">

                            <Input
                                onKeyDown={handleKeyDown}
                                type="text"
                                size={isMedium ? 'lg' : 'xl'}
                                label="Company name"
                                placeholder="Enter company name"
                                rounded="pill"
                                color="info"
                                className="[&>label>span]:font-medium"
                                {...register('company_name')}
                                error={errors.company_name?.message}
                            />
                            <Password
                                onKeyDown={handleKeyDown}
                                label="Password"
                                placeholder="Enter your password"
                                rounded="pill"
                                size={isMedium ? 'lg' : 'xl'}
                                color="info"
                                className="[&>label>span]:font-medium"
                                {...register('password')}
                                error={errors?.password?.message}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                            <Password
                                onKeyDown={handleKeyDown}
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



                        <div className="flex items-center justify-between pb-2">
                            <Checkbox
                                {...register('isAgreedtoemail')}
                                label="I agree to receive email notifications(like when I earn a commission) and other important emails regarding the affiliate program"
                                color="info"
                                variant="flat"
                                className="[&>label>span]:font-medium"
                                error={errors.isAgreedtoemail?.message}
                            />
                            <Checkbox
                                {...register('isAgreedtotems')}
                                label="I agree to affiliate terms and conditions"
                                color="info"
                                variant="flat"
                                className="[&>label>span]:font-medium"
                                error={errors.isAgreedtotems?.message}
                            />
                        </div>
                        <Button
                            className="w-full border-2 text-base font-bold"
                            type="submit"
                            color="info"
                            size={isMedium ? 'lg' : 'xl'}
                            rounded="pill"
                            disabled={signIn?.loading}
                        >
                            Sign up
                            {signIn && signIn?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                        </Button>

                        <div>
                                Already a member ? <Link className="font-semibold text-gray-700 transition-colors hover:text-blue" href={routes.affiliate.signin}>Sign in</Link> 
                        </div>
                    </div>

                )}
            </Form>
        </>
    );
}