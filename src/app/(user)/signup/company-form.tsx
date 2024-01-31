'use client';

import { CompanyDetailsSchema, companyDetailsSchema } from "@/utils/validators/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "rizzui";
import CompanyDetailsForm from "./company-details";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/redux/slices/user/auth/signupSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { routes } from "@/config/routes";

export default function CompanyForm(props: any) {
    const { signUpFormData, setNextBtn, setTitle, setFdata, fdata } = props;
    const signUp = useSelector((state: any) => state?.root?.signUp)
    const initialValues = {
        companyName: fdata?.companyName ?? '',
        companyWebsite: fdata?.companyWebsite ?? '',
        peopleCount: fdata?.peopleCount ?? '',
        industry: fdata?.industry ?? ''
    };
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const methods = useForm<CompanyDetailsSchema>({
        resolver: zodResolver(companyDetailsSchema),
        defaultValues: initialValues,
    });

    const onSubmit: SubmitHandler<CompanyDetailsSchema> = (data) => {
        dispatch(signUpUser({ ...signUpFormData, ...data })).then((result: any) => {
            if (signUpUser.fulfilled.match(result)) {
                if (result && result.payload.success === true) {
                    router.replace(routes.signIn);
                }
            }
        })
    };

    const handleClick = () => {
        dispatch(signUpUser({ ...signUpFormData })).then((result: any) => {
            if (signUpUser.fulfilled.match(result)) {
                if (result && result.payload.success === true) {
                    router.replace(routes.signIn);
                }
                setLoader(false)
            }
        })
        setLoader(true);
    };

    const handlePrevClick = () => {
        setNextBtn(false);
        setTitle('Sign Up!');
    }

    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                // className={cn('[&_label.block>span]:font-medium', className)}
                >
                    <CompanyDetailsForm fdata={fdata} setFdata={setFdata} />
                    <Button
                        className="border-2 text-base font-bold float-right mt-8"
                        type="submit"
                        color="info"
                        rounded="pill"
                        disabled={signUp?.loading && !loader}
                    >
                        Submit
                        {signUp?.loading && !loader && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                    </Button>
                </form>
            </FormProvider>
            <Button
                className="border-2  text-base font-medium float-right me-3 mt-8"
                type="submit"
                color="info"
                rounded="pill"
                onClick={handleClick}
                disabled={loader}
            >
                Skip & Save
                {loader && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
            </Button>
            <Button
                className="border-2  text-base font-medium float-left me-3 mt-8"
                type="submit"
                color="info"
                rounded="pill"
                onClick={handlePrevClick}
            >
                Previous
            </Button>
        </>
    );
}