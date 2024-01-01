import AxiosDefault from "../../services/AxiosDefault";

type RequestData = {
  email: string;
  password: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
};

export const PostSignin = async (data: RequestData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/v1/users/signin",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};

export const PostForgetPassword = async (data: RequestData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/v1/users/forgot-password",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};

export const PostForgetPasswordReset = async (data: RequestData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/v1/users/reset-password",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
