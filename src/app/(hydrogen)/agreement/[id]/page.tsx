'use client'
import { getSingleagreement } from '@/redux/slices/user/agreement/agreementSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'rizzui';

export default function AgreementDetailsPage({ params }: { params: { id: string } }) {

    const router = useRouter()
    const dispatch = useDispatch()

    const { singleAgreementdetails, loading } = useSelector((state: any) => state?.root?.agreement);
    console.log(singleAgreementdetails, 'singleAgreementdetails')



    useEffect(() => {
        dispatch(getSingleagreement(params?.id))
    }, [params?.id])

    return (
        <>
            <h3 className='flex justify-between items-center border-2 rounded border-solid border-gray-300 bg-gray-100 p-3'>
                <span>Introduction</span>
                <Button type="button" onClick={() => { router.push(`/agreement`) }} className="bg-none text-xs sm:text-sm">
                    Back
                </Button>
            </h3>
            <div className='mt-5' dangerouslySetInnerHTML={{ __html: singleAgreementdetails?.data?.agreement_content }} />
        </>
    )
}
