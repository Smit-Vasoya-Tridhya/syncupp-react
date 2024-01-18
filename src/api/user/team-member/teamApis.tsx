import AxiosDefault from "../../../services/AxiosDefault";

type TeamData = {
  _id:string;
    email: string;
    name: string;
    contact_number: string;
    role?: string;
  }

type EditTeamData = {
    _id:string;
    email: string;
    name: string;
    contact_number: string;
    role?: string;
  }
// Add new team member API
export const PostTeamEnroll = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/team-member/add",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// Edit team member API
export const EditTeamMember = async (data: EditTeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/team-member/edit/${data._id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// delete Team member API
export const DeleteTeamMember = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/team-member/delete/${data._id}`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// view team member by ID
export const GetTeamMemberDataByID = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/team-member/details/${data._id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

// Team data table API
export const GetTeamMemberTableData = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/team-member/get-all`,
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};