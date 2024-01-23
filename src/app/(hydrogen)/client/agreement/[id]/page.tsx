'use client'
import { getSingleClientAgreement } from '@/redux/slices/user/client/agreement/clientAgreementSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AgreementDetailsPage({ params }: { params: { id: string } }) {

    const router = useRouter()
    const dispatch = useDispatch()

    const { singleAgreementdetails, loading } = useSelector((state: any) => state?.root?.clienAgreement);

    console.log("singleAgreementdetails", singleAgreementdetails?.data, loading);

    useEffect(() => {
        dispatch(getSingleClientAgreement(params?.id))
    }, [params?.id])

    return (
        <>
            <h1> Client Introduction</h1>
            <div className='mt-5' dangerouslySetInnerHTML={{ __html: singleAgreementdetails?.data?.agreement_content }} />
        </>
    )
}
