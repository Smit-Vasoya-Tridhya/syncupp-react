"use client";
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import SetPasswordForm from './set-password-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { postVerifyClient } from '@/redux/slices/user/client/clientSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '@/components/ui/spinner';

export default function MainPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const searchParams = useSearchParams();
    console.log("search Params....", searchParams.get("email"))
  
    const email = searchParams.get("email");
    const agency = searchParams.get("agency");
    let redirectt = searchParams.get("redirect");
    console.log("redirect....", redirectt)
    let redirect = (redirectt === 'true');
    
    // console.log("token....", token)

    useEffect(() => { redirect &&
        dispatch(postVerifyClient({email: email, agency_id: agency, redirect: redirect })).then((result: any) => {
          if (postVerifyClient.fulfilled.match(result)) {
            // console.log('resultt', result)
            if (result && result.payload.success === true ) {
              router.replace(routes.signIn);
            } 
          }
        })
      }, [dispatch, router, agency, email, redirect]);

  return (
    <>
        { !redirect ? (
            <AuthWrapperTwo title="Set your password" isSocialLoginActive={false}>
                <SetPasswordForm />
            </AuthWrapperTwo> ) : (
                <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>
            )
        }
    </>
  );
}