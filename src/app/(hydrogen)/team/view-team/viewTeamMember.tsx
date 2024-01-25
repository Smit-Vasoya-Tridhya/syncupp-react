'use client';

import { Text } from "rizzui";
import { TfiEmail } from "react-icons/tfi";
import { FaUser , FaRegCopy } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { getTeamMemberProfile } from "@/redux/slices/user/team-member/teamSlice";
import { useSelector } from "react-redux";

export default function ViewTeamMemberForm(props: any) {
  const dispatch = useDispatch();
  const { data } = props;
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  // const[formData]= data;
  let dataa = teamMemberData?.teamMember;
  
  console.log(props.data,'props.data........')
  
  const initialValues = {
    _id: data?._id ?? '',
    name: data?.name ?? '',
    email: data?.email ?? '',
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    contact_no: data?.contact_no ?? '',
    member_role: data?.member_role ?? '',
  };
  let formData = {
    ...initialValues,
  };

  const filteredFormData = Object.fromEntries(
    Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
  );
     

  const fullData = { ...filteredFormData }

    dispatch(getTeamMemberProfile({ ...fullData, _id: dataa._id })).then((result: any) => {
        if (getTeamMemberProfile.fulfilled.match(result)) {
          if (result && result.payload.success === true ) {
            // router.replace(routes.admin.dashboard);
          } 
        }
      })
    return(
        <>
        <h2>Team View</h2>
        <div className="py-3 text-lg text-black">
           <span className="flex items-center"><FaUser className="me-1.5 h-[17px] w-[17px]" /> <Text>Name:</Text> <Text>{dataa.name}</Text> </span>
           <span className="flex items-center"><TfiEmail className="me-1.5 h-[17px] w-[17px]" /> <Text>Email:</Text> <Text>{dataa.email}</Text> <FaRegCopy className="me-1.5 h-[17px] w-[17px] cursor-pointer" /> </span>
           <span className="flex items-center"><IoCallOutline className="me-1.5 h-[17px] w-[17px]" /> <Text>Mobile:</Text> <Text>{dataa.contact_no}</Text> </span>
           <span className="flex items-center"><GrUserSettings className="me-1.5 h-[17px] w-[17px]" /> <Text>Permission:</Text> <Text>{dataa.member_role}</Text> </span>
        </div>
        </>
    )
}
