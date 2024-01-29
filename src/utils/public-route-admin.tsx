"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';

const WithAuthPublic = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    useEffect(() => {

      console.log("####" ,token)
      if (token) {
        router.replace('/admin/dashboard')
      } else {
        setLoading(false);
      }
    }, [token , router]);

    if (isLoading) {
      return <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuthPublic