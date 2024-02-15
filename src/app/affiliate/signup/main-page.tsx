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
import { signup } from '@/redux/slices/affiliate/authSlice';
import Image from 'next/image';
import Logo from '../../../../public/assets/images/logo.png';



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
    const { loading } = useSelector((state: any) => state?.root?.auth)

    const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
        console.log(data, 'data')
        dispatch(signup(data)).then((result: any) => {
            if (signup.fulfilled.match(result)) {
                // console.log(result, 'result', result?.payload?.data?.user?.status, result?.payload?.data?.user?.role?.name)
                if (result && result.payload.success === true) {
                    router.replace(routes.affiliate.signin);
                }
            }
        })
        // setReset({ ...initialValues, rememberMe: false });
    };
    

    return (
        <>
       
            <div className='h-full w-full bg-bgpink lg:py-24 py-10'>
                <div className='max-w-screen-xl mx-auto w-full lg:px-[115px] px-4'>
                    <div className='text-center pb-12'>
                        <a href="#" className="mx-auto text-center w-auto inline-block">
                            <Image src={Logo} className="mx-auto" alt="Logo" />
                        </a>
                        <h4 className='font-bold text-4xl leading-8 text-black font-koulen koulen-regular  uppercase tracking-tighter'>Affiliate Program</h4>
                    </div>
                    <div className='bg-white px-[200px] py-12'>
                        <p className='lg:pb-7 pb-4 font-normal text-lightblack font-inter text-base lg:leading-8'>Join the SyncUpp Affiliate Program and turn your network into revenue. Earn generous commissions while helping marketing agencies unlock unparalleled growth. Elevate your earnings with SyncUpp</p>
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

                                // console.log(errors, 'errors'),

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                                        <Input
                                            onKeyDown={handleKeyDown}
                                            type="email"
                                            label="Email"
                                            labelClassName='text-darkpurple'
                                            inputClassName='border border-darkpurple'
                                            placeholder="Enter your email"
                                            color="info"
                                            size={isMedium ? 'lg' : 'xl'}
                                            className="[&>label>span]:font-medium text-purple"
                                            {...register('email')}
                                            error={errors?.email?.message}
                                        />
                                        <Input
                                            onKeyDown={handleKeyDown}
                                            type="text"
                                            size={isMedium ? 'lg' : 'xl'}
                                            label="First Name"
                                            labelClassName='text-darkpurple'
                                            inputClassName='border border-darkpurple'
                                            placeholder="Enter first name"
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
                                            labelClassName='text-darkpurple'
                                            inputClassName='border border-darkpurple'
                                            placeholder="Enter company name"
                                            color="info"
                                            className="[&>label>span]:font-medium"
                                            {...register('company_name')}
                                            error={errors.company_name?.message}
                                        />
                                        <Password
                                            onKeyDown={handleKeyDown}
                                            label="Password"
                                            labelClassName='text-darkpurple'
                                            inputClassName='border border-darkpurple'
                                            placeholder="Enter your password"
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
                                            labelClassName='text-darkpurple'
                                            inputClassName='border border-darkpurple'
                                            placeholder="Enter your password"
                                            size={isMedium ? 'lg' : 'xl'}
                                            color="info"
                                            className="[&>label>span]:font-medium"
                                            {...register('confirmPassword')}
                                            error={errors.confirmPassword?.message}
                                        />
                                    </div>



                                    <div className="pb-2">
                                        <Checkbox
                                            {...register('isAgreedtoemail')}
                                            label="I agree to receive email notifications(like when I earn a commission) and other important emails regarding the affiliate program"
                                            labelClassName='text-lightblack font-inter text-base pb-4 font-normal'
                                            color="info"
                                            variant="flat"
                                            className="[&>label>span]:font-medium items-start"
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
                                    <div className='text-center'>
                                    <Button
                                        className="border-2 text-base font-bold w-auto bg-lightpurple text-darkpurple uppercase font-inter px-4 py-3 mx-auto leading-normal"
                                        type="submit"
                                        color="info"
                                        size={isMedium ? 'lg' : 'xl'}
                                        disabled={loading}
                                    >
                                        Sign up
                                        {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                                    </Button>
                                   

                                        <div className='mt-7'>
                                            <span className='text-black font-inter font-normal text-base leading-7'>Already a member ? <Link className="font-bold transition-colors text-darkpurple" href={routes.affiliate.signin}>Sign in</Link></span>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
