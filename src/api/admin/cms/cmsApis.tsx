import AxiosDefault from "../../../services/AxiosDefault";

export type AddTermAndConditionData = {
    _id?:string,
    title: string,
    description?: string,
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any 
};
// Add new Term & condition API
export const PostTermAndCondotionEnroll = async (data: AddTermAndConditionData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/add-term-and-condition",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};