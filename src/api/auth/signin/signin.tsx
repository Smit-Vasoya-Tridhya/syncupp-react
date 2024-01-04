import AxiosDefault from "../../../services/AxiosDefault";

export type RequestData = {
  email: string,
  newPassword?: string,
  token?: string
};

export type SignInData = {
  email: string,
  password: string,
};

export type ForgotData = {
  email: string;
};
type ChangePasswordData = {
  old_password: string;
  new_password: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any 
};
// signin API
export const PostSignin = async (data: SignInData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/login",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// ForgotPassword API
export const PostForgetPassword = async (data: ForgotData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/forgotPassword",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Reset password API
export const PostResetPassword = async (data: RequestData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/resetPassword",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// change Password API
export const PostChangePassword = async (data: ChangePasswordData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/updatePassword",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};