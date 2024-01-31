// 'use client';

// import SelectLoader from '@/components/loader/select-loader';
// import { Form } from '@/components/ui/form';
// import { getAllClient } from '@/redux/slices/user/client/clientSlice';
// import { getClientsList, setClientId, setClientName } from '@/redux/slices/user/team-member/teamSlice';
// import dynamic from 'next/dynamic';
// import { useEffect } from 'react';
// import { Controller } from 'react-hook-form';
// import { useDispatch, useSelector } from "react-redux";



// const Select = dynamic(() => import('@/components/ui/select'), {
//     ssr: false,
//     loading: () => <SelectLoader />,
// });


// export default function ClientSelectionForm() {

//     const dispatch = useDispatch();
//     const teamMemberData = useSelector(
//         (state: any) => state?.root?.teamMember
//       );
//     useEffect(() => {
//         dispatch(getAllClient({ pagination: false }))
//     }, [dispatch]);

//     // console.log("Clients list....", teamMemberData?.clients)

//     let initialValue: Record<string, string> = {
//         client_selection: teamMemberData?.clientName ?? ''
//     }

//     let agencyOptions: Record<string, any>[] = teamMemberData?.clients && teamMemberData?.clients?.length > 0 ? teamMemberData?.clients?.map((client: Record<string, string>) => {
//         let agency_name = client?.first_name + " " + client?.last_name
//         return { name: agency_name, value: client?.reference_id, key: client }
//     }) : [];

//     const handleClientChange = (selectedOption: Record<string, any>) => {
//         // console.log("selected option....", selectedOption)
//         dispatch(setClientName(selectedOption?.name))
//         dispatch(setClientId(selectedOption?.value))
//     }

//     const onSubmit = (data: any) => {
//         // console.log('form data', data);
//     };

//     // if (teamMemberData?.clients.length === 0) {
//     //     return <SelectLoader />
//     // } else {
//         return (
//             <>
//                 <Form
//                     onSubmit={onSubmit}
//                     useFormProps={{
//                         defaultValues: initialValue
//                     }}
//                 >
//                     {({ control, formState: { errors } }) => (
//                         <div className="space-y-5 float-right">
//                             <Controller
//                                 control={control}
//                                 name="client_selection"
//                                 render={({ field: { onChange, value } }) => (
//                                     <Select
//                                         options={agencyOptions}
//                                         onChange={(selectedOption: Record<string, any>) => {
//                                             onChange(selectedOption?.name);
//                                             handleClientChange(selectedOption);
//                                         }}
//                                         value={value}
//                                         placeholder='Select Client'
//                                         // getOptionValue={(option) => option.value}
//                                         className="font-medium"
//                                         dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg"
//                                     />
//                                 )}
//                             />
//                         </div>
//                     )}
//                 </Form>
//             </>
//         );
//     // }
// }
