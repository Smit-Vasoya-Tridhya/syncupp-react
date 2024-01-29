import AxiosDefault from "../../../services/AxiosDefault";

type PostAddTeamMemberApiData = {
    email: string;
    name: string;
    contact_number?: string;
    role?: string;
    agency_id?: string;
  }

type PostTeamMemberVerifyApiData = {
  email: string;
  agency_id: string;
  redirect: boolean;
  token?: string;
  client_id?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

type PutEditTeamMemberApiData = {
    id:string;
    name?: string;
    email?: string;
    contact_number?: string;
    role?: string;
    agency_id?: string;
  }

  type DeleteTeamMemberApiData = {
    teamMemberIds: string[];
    agency_id?: string;
  }

  type GetAllTeamMemberApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
    agency_id?: string;
  }

  type GetTeamMemberProfileApiData = {
    _id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    first_name: string;
    last_name: string;
    user_type: string;
    agency_id: string;
    member_role: string;
  };


// Add new team member API
export const PostAddTeamMemberApi = async (data: PostAddTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/team-member/add",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// Verify team member API
export const PostTeamMemberVerifyApi = async (data: PostTeamMemberVerifyApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/team-member/verify",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// Edit team member API
export const PutEditTeamMemberApi = async (data: PutEditTeamMemberApiData) => {
  // console.log("id in edit team api", data)
  const response = await AxiosDefault({
    url: `/api/v1/team-member/edit/${data.id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// delete Team member API
export const DeleteTeamMemberApi = async (data: DeleteTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/delete`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};


// Get all team member
export const GetAllTeamMemberApi= async (data: GetAllTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/get-all`,
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};


  // get team member profile
  export const GetTeamMemberProfileApi = async (data: GetTeamMemberProfileApiData ) => {
    const response = await AxiosDefault({
      url: `/api/v1/team-member/details/${data._id}`,
      method: "GET",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };

   // get client list api
   export const GetClientsListApi = async () => {
    const response = await AxiosDefault({
      url: `/api/v1/team-member/details`,
      method: "GET",
      // data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };