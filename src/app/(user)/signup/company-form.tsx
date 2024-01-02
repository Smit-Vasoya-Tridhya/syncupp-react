'use client';

import cn from "@/utils/class-names";
import { CompanyDetailsSchema, companyDetailsSchema } from "@/utils/validators/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useMedia from "react-use/lib/useMedia";
import { Button } from "rizzui";
import CompanyDetailsForm from "./company-details";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "@/redux/slices/user/auth/signupSlice";


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

    const methods = useForm<CompanyDetailsSchema>({
        resolver: zodResolver(companyDetailsSchema),
        defaultValues: initialValues,
    });

    const onSubmit: SubmitHandler<CompanyDetailsSchema> = (data) => {
        console.log('Company Details data...', data);
        console.log('Full data...', {...signUpFormData, ...data});
        dispatch(signUpUser({...signUpFormData, ...data}))
        methods.reset(initialValues);
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
                    <Button
                        className="border-2 border-primary-light text-base font-medium float-right mt-8"
                        type="submit"
                        size={isMedium ? 'lg' : 'xl'}
                        color="info"
                        rounded="pill"
                        >
                        Submit
                    </Button>
                </form>
            </FormProvider>
            <form>
                <Button
                className="border-2 border-primary-light text-base font-medium float-right me-3 mt-8"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
                onClick={handleClick} 
                >
                Skip & Save
                </Button>
            </form>
        </>
    );
}