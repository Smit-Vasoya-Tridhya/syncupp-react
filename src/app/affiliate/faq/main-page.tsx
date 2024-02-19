"use client"

import { faqlistapicall } from "@/redux/slices/affiliate/faqSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



export default function FaqPage() {

    const dispatch = useDispatch()
    const faqlistData = useSelector((state: any) => state?.root?.faq?.faqlistdata);
    console.log(faqlistData, 'faqlistData')

    useEffect(() => {
        dispatch(faqlistapicall())
    }, [])

    return (
        <>
            <h1>FAQ</h1>
            {faqlistData?.data?.faqs && faqlistData?.data?.faqs?.length > 0 ? faqlistData?.data?.faqs?.map((faqdata: any, index: number) => (
                <div>
                    <h6>{index + 1}. {faqdata?.title}</h6>
                    <div>{faqdata?.description}</div>

                </div>)
            ) : "No Faq Found"}
        </>
    )

}