import AxiosDefault from "../../../services/AxiosDefault";

type SignUpData = {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  password: string;
  confirmPassword?: string;
  company_name?: string;
  company_website?: string;
  no_of_people?: string;
  industry?: string;
};

type SignInData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  email: string;
  password: string;
  token: string;
};

type ChangePasswordData = {
  old_password: string;
  new_password: string;
};

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const PostSignup = async (data: SignUpData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/signup",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const PostSignin = async (data: SignInData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/login",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const PostForgotPassword = async (data: ForgotPasswordData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/forgot-password",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const PostResetPassword = async (data: ResetPasswordData) => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/reset-password",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const PostChangePassword = async (data: ChangePasswordData) => {
  console.log("Herreeeeeeeeeeeeeeeeeee")
  const response = await AxiosDefault({
    url: "/api/v1/auth/change-password",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
