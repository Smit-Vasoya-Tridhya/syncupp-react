'use client';
import SignUpForm from './sign-up-form';
import { useState } from 'react';
import CompanyForm from './company-form';
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import WithAuthPublic from '@/utils/public-route-user';

function SignUpPage() {
  const [formData, setFormData] = useState({});
  const [title, setTitle] = useState('Sign Up!');
  const [nextBtn, setNextBtn] = useState(false);

  return (
    <>
      { nextBtn ?
        <AuthWrapperTwo title={title} isSocialLoginActive={false}>
          <CompanyForm signUpFormData={formData}  />     
        </AuthWrapperTwo> :
        <AuthWrapperTwo title={title} isSocialLoginActive={true}>
          <SignUpForm setFormData={setFormData} setNextBtn={setNextBtn} setTitle={setTitle} />   
        </AuthWrapperTwo>
      }
    </>
  );
}


export default WithAuthPublic(SignUpPage);
