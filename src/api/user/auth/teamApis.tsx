import AxiosDefault from "../../../services/AxiosDefault";

type TeamData = {
  id:string;
    email: string;
    name: string;
    contact_number: string;
    role?: string;
  }

type EditTeamData = {
    id:string;
    email: string;
    name: string;
    contact_number: string;
    role?: string;
  }

export const GetTeamMemberList = async (data: TeamData) => {
    const response = await AxiosDefault({
      url: `/api/v1/team-member/get-all`,
      method: "GET",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  }; 
export const PostTeamEnroll = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: "/api/v1/team-member/add",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
export const EditTeamMember = async (data: EditTeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/edit/${data.id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
export const DeleteTeamMember = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/delete/${data.id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
export const GetTeamMemberDataByID = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/details/${data.id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
export const GetTeamMemberTableData = async (data: TeamData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/get-all`,
    method: "GET",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

