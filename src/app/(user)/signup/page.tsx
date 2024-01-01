'use client';
import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import SignUpForm from './sign-up-form';
import { useState } from 'react';
import CompanyForm from './company-form';

export default function SignUpPage() {
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
