import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PostForgetPassword,
  PostForgetPasswordReset
} from "../../../../api/auth/signin";
import toast, { Toast } from "react-hot-toast";
import {ResetPwdFormValues} from "types"

type userEmail = {
  email :string,
  password : string

}

const initialState = {
  data: {},
  loading: false,
};

export const postForgetPassword : any = createAsyncThunk(
  "forgetPassword/postForgetPassword",
  async (data:userEmail) => {
    try {
      const response:any = await PostForgetPassword(data);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);


export const postForgetPasswordReset : any = createAsyncThunk(
  "forgetPassword/postForgetPasswordReset",
  async (data:ResetPwdFormValues) => {
    try {
      const response = await PostForgetPasswordReset(data);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);

export const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(postForgetPassword.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.data = payload.data;
        if(payload.status == 1){
          toast.success(payload.message)
        }
        else {
          toast.error(payload.message)
        }
      })
      .addCase(postForgetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postForgetPasswordReset.pending, (state) => {
        state.loading = true;
      })
      .addCase(postForgetPasswordReset.fulfilled, (state,action) => {
        state.loading = false;

      })
      .addCase(postForgetPasswordReset.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const getData = (state: { forgetPassword: any; }) => state.forgetPassword;
export default forgetPasswordSlice.reducer;
