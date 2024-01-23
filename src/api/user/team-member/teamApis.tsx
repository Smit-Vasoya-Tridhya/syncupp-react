import AxiosDefault from "../../../services/AxiosDefault";

type PostAddTeamMemberApiData = {
    email: string;
    name: string;
    contact_number?: string;
    role?: string;
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
  }

  type DeleteTeamMemberApiData = {
    id: string;
  }

  type GetAllTeamMemberApiData = {
    page?: number;
    itemsPerPage?: number;
    sortOrder?: string;
    sortField?: string;
    search?: string;
  }

  type GetTeamMemberProfileApiData = {
    id: string;
  }


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
  console.log("id in edit team api", data)
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
    url: `/api/v1/team-member/delete/${data.id}`,
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
      url: `/api/v1/team-member/details/${data.id}`,
      method: "GET",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };