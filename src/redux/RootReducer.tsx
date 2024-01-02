import { combineReducers } from "@reduxjs/toolkit";
import signinSlice from "./slices/user/auth/signinSlice";
import signupSlice from "./slices/user/auth/signupSlice";
import resetPasswordSlice from "./slices/user/auth/resetPasswordSlice";
import changePasswordSlice from "./slices/user/auth/changePasswordSlice";
import forgotPasswordSlice from "./slices/user/auth/forgotPasswordSlice";

const combinedReducer = combineReducers({
  signIn: signinSlice,
  signUp: signupSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  changePassword: changePasswordSlice
});

export const rootReducer = (state: any, action: any) => {
  // if (action.type === "auth/Logout") {
  //   state = undefined;
  // }
  return combinedReducer(state, action);
};
