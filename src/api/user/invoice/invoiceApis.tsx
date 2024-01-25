import AxiosDefault from "../../../services/AxiosDefault";

type PostAddTeamMemberApiData = {
    email: string;
    name: string;
    contact_number?: string;
    role?: string;
  }

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