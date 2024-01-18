import AxiosDefault from "../../../services/AxiosDefault";

export type AddFAQData = {
    title: string,
    description?: string,
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any 
};
// Add new FAQ API
export const PostFaqEnroll = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/add-faq",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Get All FAQ List
export const GetAllFaq = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/get-all-faq",
    method: "GET",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};