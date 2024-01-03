'use client';

import cn from "@/utils/class-names";
import { CompanyDetailsSchema, companyDetailsSchema } from "@/utils/validators/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useMedia from "react-use/lib/useMedia";
import { Button } from "rizzui";
import CompanyDetailsForm from "./company-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/redux/slices/user/auth/signupSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";


const initialValues = {
    companyName: '',
    companyWebsite: '',
    peopleCount: '',
    industry: ''
};


export default function CompanyForm(props: any) {

    const { signUpFormData } = props;
    console.log("Signupform data.......", signUpFormData);

    const isMedium = useMedia('(max-width: 1200px)', false);

    const dispatch = useDispatch();

    const router = useRouter();
    const signUp = useSelector((state: any) => state?.root?.signUp)
    console.log("signUp state.....", signUp)
  
    useEffect(()=> {
      if(signUp.user.success === true ){
        router.push('/dashboard')
      }
    }, [router, signUp]);

    const methods = useForm<CompanyDetailsSchema>({
        resolver: zodResolver(companyDetailsSchema),
        defaultValues: initialValues,
    });

    const onSubmit: SubmitHandler<CompanyDetailsSchema> = (data) => {
        console.log('Company Details data...', data);
        console.log('Full data...', {...signUpFormData, ...data});
        dispatch(signUpUser({...signUpFormData, ...data}))
        // methods.reset(initialValues);
    };

    const handleClick = () => {
        console.log('Skip & Save clicked');
        dispatch(signUpUser({...signUpFormData}))
    };

    return(
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    // className={cn('[&_label.block>span]:font-medium', className)}
                >
                    <CompanyDetailsForm />
                     { signUp.loading ? (<Button
                        className="border-2 text-base font-bold float-right mt-8"
                        type="submit"
                        size={isMedium ? 'lg' : 'xl'}
                        color="info"
                        rounded="pill"
                        disabled
                    >
                        Submit
                        <Spinner size="sm" tag='div' className='ms-3' color='white' />
                    </Button>) : (<Button
                        className="border-2  text-base font-bold float-right mt-8"
                        type="submit"
                        size={isMedium ? 'lg' : 'xl'}
                        color="info"
                        rounded="pill"
                    >
                        Submit
                    </Button>)
                }
                </form>
            </FormProvider>
            {signUp.loading ? (<Button
                className="border-2  text-base font-medium float-right me-3 mt-8"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
                onClick={handleClick} 
                disabled
                >
                Skip & Save
                <Spinner size="sm" tag='div' className='ms-3' color='white' />
            </Button>) : (<Button
                className="border-2  text-base font-medium float-right me-3 mt-8"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
                onClick={handleClick} 
                >
                Skip & Save
            </Button>)
            }
        </>
    );
}