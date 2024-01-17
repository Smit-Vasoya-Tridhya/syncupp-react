'use client';

import { PostEditProfile, PostViewProfiles } from "@/api/auth/signin/signin";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type userEmail = {
  email: string;
  first_name: string,
  last_name: string,
  contact_no: string
}

const initialState = {
  data: {},
  loading: false,
  status: false,
  userEmail :{}
};

export const postViewProfile : any = createAsyncThunk(
  "viewprofile/postViewProfile",
  async () => {
    try {      
      const response:any = await PostViewProfiles();
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);
export const postEditProfile : any = createAsyncThunk(
  "viewprofile/postEditProfile",
  async (data:userEmail) => {

    try {
      const ApiData = {
        email:data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        contact_no: data.contact_no
      }
      const response:any = await PostEditProfile(ApiData);
      return response;
    } catch (error:any) {
      return { status: false, message: error.response.data.message };
    }
  }
);

export const viewProfileSlice = createSlice({
  name: "viewprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postEditProfile.pending, (state) => {
          state.loading= true
      })
      .addCase(postEditProfile.fulfilled, (state, action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          loading: false,
          data: action.payload,
        }
      })
      .addCase(postEditProfile.rejected, (state) => {
        state.loading = false;
      })
    builder
      .addCase(postViewProfile.pending, (state) => {
        return{
          ...state,
          loading: true
        }
      })
      .addCase(postViewProfile.fulfilled, (state, action) => {
        return{
          ...state,
          loading: false,
          data: action.payload,
        }
      })
      .addCase(postViewProfile.rejected, (state) => {
        state.loading = false;
      })
  },
});
export const getData = (state: { resetPassword: any; }) => state.resetPassword;
export default viewProfileSlice.reducer;