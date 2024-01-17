import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { DeleteTeamMember, EditTeamMember, GetTeamMemberDataByID, GetTeamMemberTableData, PostTeamEnroll } from "@/api/user/auth/teamApis";

type TeamData = {
  _id:string;
  email: string;
  name: string;
  contact_number: string;
  role?: string;
  sortField?: string;
  sortOrder?: string,
  page?: any;
  itemsPerPage?: Number;
  search?: string;
}

interface TeamDataResponse {
  status : boolean;
  message : string
}

const initialState = {
  loading: false,
  user: {},
  data:[]
};

export const teamEnroll: any = createAsyncThunk(
  "team/teamEnroll",
  async (data: TeamData) => {
    const apiData={
      _id: data._id,
      email: data.email,
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
    }
    try {
      const response: any = await PostTeamEnroll(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamDataResponse;
    }
  }
);
export const editTeam: any = createAsyncThunk(
  "team/editTeam",
  async (data: TeamData) => {
    const apiData={
      _id: data._id,
      email: data.email,
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
    }
    try {
      const response: any = await EditTeamMember(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamDataResponse;
    }
  }
);
export const getTeamdata: any = createAsyncThunk(
  "team/getTeamdata",
  async (data: TeamData) => {
    console.log(data,'team slice data..............................');
    const apiData :any ={
      sortField: data.sortField,
      sortOrder: data.sortOrder,
      search: data.search,
      page: data.page,
      itemsPerPage: data.itemsPerPage
    }
    try {
      const response: any = await GetTeamMemberTableData(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamDataResponse;
    }
  }
);
export const viewTeam: any = createAsyncThunk(
  "team/viewTeam",
  async (data: TeamData) => {
    const apiData={
      _id: data._id,
      email: data.email,
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
    }
    try {
      const response: any = await GetTeamMemberDataByID(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamDataResponse;
    }
  }
);
export const deleteTeamMember: any = createAsyncThunk(
  "team/deleteTeamMember",
  async (data: TeamData) => {
    const apiData={
      _id: data._id,
      email: data?.email,
      name: data?.name,
      contact_number: data?.contact_number,
      role: data?.role,
    }
    try {
      const response: any = await DeleteTeamMember(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamDataResponse;
    }
  }
);

export const teamSlice = createSlice({
  name: "team",
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
      builder
      .addCase(editTeam.pending, (state) => {
          return{
            ...state,
            loading: true,
            editTeamStatus: 'pending'
          }
      })
      .addCase(editTeam.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          user: action.payload,
          loading: false,
          editTeamStatus: 'success'
        }
      })
      .addCase(editTeam.rejected, (state) => {
        return{
          ...state,
          loading: false,
          editTeamStatus: 'error'
        }
      });
      builder
      .addCase(getTeamdata.pending, (state) => {
          return{
            ...state,
            loading: true,
            getTeamdataStatus: 'pending'
          }
      })
      .addCase(getTeamdata.fulfilled, (state,action) => {
        return{
          ...state,
          data: action.payload.data,
          loading: false,
          getTeamdataStatus: 'success'
        }
      })
      .addCase(getTeamdata.rejected, (state) => {
        return{
          ...state,
          loading: false,
          getTeamdataStatus: 'error'
        }
      });
      builder
      .addCase(viewTeam.pending, (state) => {
          return{
            ...state,
            loading: true,
            viewTeamStatus: 'pending'
          }
      })
      .addCase(viewTeam.fulfilled, (state,action) => {
        return{
          ...state,
          data: action.payload.data,
          loading: false,
          viewTeamStatus: 'success'
        }
      })
      .addCase(viewTeam.rejected, (state) => {
        return{
          ...state,
          loading: false,
          viewTeamStatus: 'error'
        }
      });
      builder
      .addCase(deleteTeamMember.pending, (state) => {
          return{
            ...state,
            loading: true,
            deleteTeamMemberStatus: 'pending'
          }
      })
      .addCase(deleteTeamMember.fulfilled, (state,action) => {
        return{
          ...state,
          data: action.payload.data,
          loading: false,
          deleteTeamMemberStatus: 'success'
        }
      })
      .addCase(deleteTeamMember.rejected, (state) => {
        return{
          ...state,
          loading: false,
          deleteTeamMemberStatus: 'error'
        }
      });
  },
});

export default teamSlice.reducer;