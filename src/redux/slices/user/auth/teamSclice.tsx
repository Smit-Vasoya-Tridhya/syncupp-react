import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { PostTeamEnroll } from "@/api/user/auth/teamApis";

type TeamData = {
  email: string;
  name: string;
  contact_number: string;
  role?: string;
}

interface TeamDataResponse {
  status : boolean;
  message : string
}

const initialState = {
  loading: false,
  user: {},
};

export const teamEnroll: any = createAsyncThunk(
  "team/teamEnroll",
  async (data: TeamData) => {
    const apiData={
      email: data.email,
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
    }
    try {
      const response: any = await PostTeamEnroll(apiData);
      localStorage.setItem("token", response.data.token);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamDataResponse;
    }
  }
);

export const teamSlice = createSlice({
  name: "Team",
  initialState,
  reducers: {

    teamEnroll(state, action) {
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        loading: false,
      };
  },

  },
  extraReducers: (builder) => {
    builder
      .addCase(teamEnroll.pending, (state) => {
          return{
            ...state,
            loading: true,
            teamEnrollStatus: 'pending'
          }
      })
      .addCase(teamEnroll.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          user: action.payload,
          loading: false,
          teamEnrollStatus: 'success'
        }
      })
      .addCase(teamEnroll.rejected, (state) => {
        return{
          ...state,
          loading: false,
          teamEnrollStatus: 'error'
        }
      });
  },
});

export default teamSlice.reducer;