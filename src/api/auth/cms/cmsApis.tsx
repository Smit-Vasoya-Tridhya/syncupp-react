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
// Add new FAQ API
export const PostTermAndCondotionEnroll = async (data: AddTermAndConditionData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/add-faq",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Update FAQ Data By ID
export const UpdateFaqDataByID = async (data: AddTermAndConditionData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/update-faq/${data._id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};