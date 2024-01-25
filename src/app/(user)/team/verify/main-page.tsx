"use client";
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import SetPasswordForm from './set-password-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { verifyTeamMember } from '@/redux/slices/user/team-member/teamSlice';

export default function MainPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const searchParams = useSearchParams();
    // console.log("search Params....", searchParams.get("email"))
  
    const email = searchParams.get("email");
    const agency = searchParams.get("agency");
    const token = searchParams.get("token");
    let redirectt = searchParams.get("redirect");
    // console.log("redirect....", redirectt)
    let redirect = (redirectt === 'true');
    
    // console.log("token....", token)

    useEffect(() => { redirect &&
        dispatch(verifyTeamMember({email: email, agency_id: agency, redirect: redirect, token: token })).then((result: any) => {
          if (verifyTeamMember.fulfilled.match(result)) {
            // console.log('resultt', result)
            if (result && result.payload.success === true ) {
              router.replace(routes.signIn);
            } 
          }
        })
      }, [dispatch, router, agency, email, token, redirect]);

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