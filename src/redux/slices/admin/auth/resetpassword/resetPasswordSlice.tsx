import { PostResetPassword } from "@/api/auth/signin/signin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast, { Toast } from "react-hot-toast";

type userEmail = {
  email :string,
  password : string
}

const initialState = {
  data: {},
  loading: false,
  userEmail :{}
};

export const postResetPassword : any = createAsyncThunk(
  "resetpassword/postResetPassword",
  async (data:userEmail) => {
    try {
      const response:any = await PostResetPassword(data);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(postResetPassword.fulfilled, (state,{payload}) => {
        state.loading = true;
        state.data = payload.data;
        if(payload.status == 200){
          toast.success(payload.message)
        }
        else {
          toast.error(payload.message)
        }
      })
      .addCase(postResetPassword.rejected, (state) => {
        state.loading = false;
      })
  },
});
export const getData = (state: { resetPassword: any; }) => state.resetPassword;
export default resetPasswordSlice.reducer;