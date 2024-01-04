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
    const token = localStorage.getItem('token');

    // const user = jwtDecode(token);

    useEffect(() => {

      console.log("####" ,token)
      if (token) {
        // router.back()
        console.log(signIn);
        
        if(signIn.user?.data?.user?.role?.name === "agency"){
          // debugger
          router.replace('/dashboard')
          setLoading(false);
        }else{
          // debugger
          router.replace('/admin/dashboard')
        }
      } else {
        setLoading(false);
      }
    }, [token]);

    if (isLoading) {
      return <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuthPublic