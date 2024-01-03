import { combineReducers } from "@reduxjs/toolkit";
import signinSlice from "./slices/user/auth/signinSlice";
import signupSlice from "./slices/user/auth/signupSlice";
import resetPasswordSlice from "./slices/user/auth/resetPasswordSlice";
import changePasswordSlice from "./slices/user/auth/changePasswordSlice";
import forgotPasswordSlice from "./slices/user/auth/forgotPasswordSlice";
import adminSignInSlice from "./slices/admin/auth/signin/signinSlice";
import adminForgotPasswordSlice from "./slices/admin/auth/forgotpassword/forgetPasswordSlice";
import adminResetPasswordSlice from "./slices/admin/auth/resetpassword/resetPasswordSlice";


 const combinedReducer = combineReducers({
  signIn: signinSlice,
  signUp: signupSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  changePassword: changePasswordSlice,
  adminSignIn: adminSignInSlice,
  adminForgotPassword: adminForgotPasswordSlice,
  adminResetPassword: adminResetPasswordSlice,

});

 const rootReducer = (state: any, action: any) => {
  // if (action.type === "auth/Logout") {
  //   state = undefined;
  // }
  return combinedReducer(state, action);
};

export default rootReducer