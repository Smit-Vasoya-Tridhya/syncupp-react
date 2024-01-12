"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import { useSelector } from 'react-redux';

const WithAuthPublic = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const signIn = useSelector((state: any) => state?.root?.signIn);
    const socialSignup = useSelector((state: any) => state?.root?.socialSignup);
    const token = localStorage.getItem('token');


    useEffect(() => {

      // console.log("####" ,token)
      if (token) {

        if(signIn?.user?.data?.user?.role?.name === "agency" || socialSignup?.user?.data?.user?.role?.name === "agency" || socialSignup?.user?.data?.user?.role?.name === "client"  ){
          router.replace(routes.dashboard)
        } else {
          router.replace(routes.admin.dashboard)
        }

      } else {

        setLoading(false);

      }
    }, [token, router, signIn, socialSignup]);

    if (isLoading) {
      return <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuthPublic