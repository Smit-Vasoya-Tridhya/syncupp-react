"use client";

import { routes } from "@/config/routes";
import { getAllTeamMember } from "@/redux/slices/user/team-member/teamSlice";
import { initiateRazorpay } from "@/services/clientpaymentService";
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export default function PaymentPage() {

    const token = localStorage.getItem('token')

    const router = useRouter()
    const dispatch = useDispatch()

    const { addClientteamdetails } = useSelector((state: any) => state?.root?.teamMember);
    const paginationParams = useSelector((state: any) => state?.root?.teamMember?.paginationParams);
    console.log(addClientteamdetails, 'addClientteamdetails')

    const ClintteamlistAPIcall = async () => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search, pagination: true }));

    }

    return (
        <>
            <div className="">
                <div className="flex justify-evenly p-24 gap-10">
                    <div className="w-1/2 min-h-full p-10 flex items-start flex-col shadow-lg h-screen">
                        <div className="font-hanuman text-3xl font-bold py-5">
                            Purchase with Referral points
                        </div>
                        <div className="bg-gray-600 w-full h-px"></div>
                        <div>
                            <div className="text-gray-600 font-lato text-xl font-semibold pt-5">Your referral points</div>
                            <div className="font-lato font-semibold py-5 text-xl">2000</div>
                            <button disabled onClick={() => { initiateRazorpay(router, routes.client_team, token, addClientteamdetails?.data?.reference_id, ClintteamlistAPIcall) }} className="cursor-pointer bg-gray-800 text-white font-lato px-4 py-2">Purchase</button>
                        </div>
                    </div>
                    <div className="w-1/2 min-h-full p-10 flex items-start flex-col shadow-lg h-screen">
                        <div className="font-hanuman text-3xl font-bold py-5">
                            Subscription
                        </div>
                        <div className="bg-gray-600 w-full h-px"></div>
                        <div>
                            <div className="text-gray-600 font-lato text-xl font-semibold pt-5">Subscription Details</div>
                            <div className="font-lato font-semibold py-5 text-xl">Subscription Amount : 6000</div>
                            <button onClick={() => { initiateRazorpay(router, routes.client_team, token, addClientteamdetails?.data?.reference_id, ClintteamlistAPIcall) }} className="cursor-pointer bg-gray-800 text-white font-lato px-4 py-2">Purchase</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}