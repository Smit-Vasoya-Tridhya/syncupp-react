'use client'
import { getSingleagreement } from '@/redux/slices/user/agreement/agreementSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AgreementDetailsPage({ params }: { params: { id: string } }) {

    const router = useRouter()
    const dispatch = useDispatch()

    const { singleAgreementdetails, loading } = useSelector((state: any) => state?.root?.agreement);

    console.log("singleAgreementdetails", singleAgreementdetails?.data, loading);

    useEffect(() => {
        dispatch(getSingleagreement(params?.id))
    }, [params?.id])

    return (
        <>
            <h1>Introduction</h1>
            <div className='mt-5' dangerouslySetInnerHTML={{ __html: singleAgreementdetails?.data?.agreement_content }} />
        </>
    )
}
