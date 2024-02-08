"use client";

import cn from "@/utils/class-names";
import { Title, Text } from '@/components/ui/text';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/redux/slices/user/client/clientSlice";
import { initiateRazorpay } from "@/services/clientpaymentService";
import { routes } from "@/config/routes";
import { useState } from "react";
import { getAllTeamMember } from "@/redux/slices/user/team-member/teamSlice";
import Spinner from "@/components/ui/spinner";
import { Button } from "rizzui";


export default function ClientPaymentPage() {

    const token = localStorage.getItem('token')

    const router = useRouter()
    const dispatch = useDispatch()

    const { addClientteamdetails } = useSelector((state: any) => state?.root?.teamMember);
    const paginationParams = useSelector((state: any) => state?.root?.teamMember?.paginationParams);
    console.log(addClientteamdetails, 'addClientteamdetails')
    const { userProfile } = useSelector((state: any) => state?.root?.signIn);
    const { loading } = useSelector((state: any) => state?.root?.payment);
    console.log(loading, 'loading')

    const [loadingflag, setloadingflag] = useState(false)
    const [selectedValue, setSelectedValue] = useState('option2Value');

    const ClintteamlistAPIcall = async () => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search, pagination: true }));

    }

    const handleRadioChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div
                className={cn(
                    'isomorphic-form isomorphic-form mx-auto flex w-full max-w-[1536px] flex-grow flex-col @container [&_label.block>span]:font-medium'
                )}
            >
                <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
                    <div className="gap-4 border-gray-200 @container @5xl:col-span-8 @5xl:border-e @5xl:pb-12 @5xl:pe-7 @6xl:col-span-7 @7xl:pe-12">
                        <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
                            <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5">
                                Payment
                            </Title>
                            <div className="rounded-lg border border-gray-200">
                                <div className="px-3 py-2">
                                    <input
                                        disabled
                                        style={{ cursor: "not-allowed" }}
                                        type="radio"
                                        id="option1"
                                        name="options"
                                        value="option1Value"
                                        checked={selectedValue === "option1Value"}
                                        onChange={handleRadioChange}
                                    />
                                </div>
                                <div className="p-4 @xs:p-6 @2xl:flex @2xl:items-start @2xl:justify-between @2xl:gap-6">
                                    <div className="block @5xl:pe-8">
                                        <Title as="h4" className="mb-2.5 text-base font-medium">
                                            Purchase with Referral points
                                        </Title>
                                        <Text as="p">
                                            Comming soon...
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-gray-200">
                                <div className="px-3 py-2">
                                    <input
                                        type="radio"
                                        id="option2"
                                        name="options"
                                        value="option2Value"
                                        checked={selectedValue === "option2Value"}
                                        onChange={handleRadioChange}
                                    />
                                </div>
                                <div className="p-4 @xs:p-6 @2xl:flex @2xl:items-start @2xl:justify-between @2xl:gap-6">
                                    <div className="block @5xl:pe-8">
                                        <Title as="h4" className="mb-2.5 text-base font-medium">
                                            Subscription
                                        </Title>
                                        <Text as="p">
                                            Subscription Amount : {userProfile?.payable_amount}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={cn(
                            'sticky top-24 mt-8 @5xl:col-span-4 @5xl:mt-0 @6xl:col-span-3 2xl:top-28',

                        )}
                    >
                        <Title as="h4" className="mb-3 font-semibold">
                            Your Order
                        </Title>
                        <div className="rounded-lg border border-gray-200 p-4 @xs:p-6 @5xl:rounded-none @5xl:border-none @5xl:px-0">
                            <div className="pt-4 @xl:pt-6">
                                <div className="mb-4 flex items-center justify-between last:mb-0">
                                    Subscription Amount
                                    <Text as="span" className="font-medium text-gray-900">
                                        {/* {subtotal} */}
                                        {userProfile?.payable_amount}
                                    </Text>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 py-4 text-base font-bold text-gray-1000">
                                    Total
                                    <Text>{userProfile?.payable_amount}</Text>
                                </div>
                                <Button
                                    disabled={loadingflag}
                                    onClick={() => { initiateRazorpay(router, routes.agency_team, token, addClientteamdetails?.data?.reference_id, ClintteamlistAPIcall, setloadingflag) }}
                                    type="button"
                                    className="mt-3 w-full text-base @md:h-12 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                                >
                                    Check out
                                    {loadingflag && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}