import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostSignin } from "../../../../../api/auth/signin/signin";
import { toast } from 'react-hot-toast';
import { messages } from "@/config/messages";

type UserData = {
  email: string;
  password: string;
}

interface SigninState {
  loading: boolean;
  userData: {},
}

interface PostSigninResponse {
  status: boolean;
  message: string
}

const initialState: SigninState = {
  loading: false,
  userData: {},
};

export const postSignin: any = createAsyncThunk(
  "signin/postSignin",
  async (data: UserData) => {
    try {
      console.log('..............')
      const response: any = await PostSignin(data);
      return response as UserData;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignin.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSignin.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload,'action.payload')
        if (action.payload.status == 200) {
          localStorage.setItem('token', action.payload.data.token);
          state.userData = action.payload.data.user;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(postSignin.rejected, (state) => {
        state.loading = false;
      })
  },
});
export const getUserData = (state: { signin: { userData: any; }; }) => state.signin.userData;
export default signinSlice.reducer;