import AxiosDefault from "../../../services/AxiosDefault";

export type AddClientReviewData = {
  _id?: string;
  image:string;
  client_review_image:string;
  customer_name: string;
  company_name?: string;
  review?: string;
  items_per_page?: Number;
  page?: Number;
  search?: string;
  sort_field?: string;
  sort_order?: string;
  id?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any 
};
// Add new Client Review API
export const PostClientReviewEnroll = async (data: AddClientReviewData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/add-client-review",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Get All Client Review List
export const GetAllClientReview = async (data: AddClientReviewData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/get-all-client-review",
    method: "POST",
    data: data,
    contentType: "application/json",  
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
//get Client Review Data By ID
export const GetClientReviewDataByID = async (data: AddClientReviewData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/get-client-review/${data._id}`,
    method: "GET",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// delete Client Review DATA By ID
export const DeleteClientReviewData = async (data: AddClientReviewData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/delete-client-review`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Update Client Review Data By ID
export const UpdateClientReviewDataByID = async (data: AddClientReviewData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/update-client-review/${data._id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};