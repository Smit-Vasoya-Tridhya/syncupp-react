import AxiosDefault from "../../../services/AxiosDefault";

type TeamData = {
    email: string;
    name: string;
    contact_number: string;
    role?: string;
  }
  
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
