import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { DeleteTeamMemberApi, GetAllTeamMemberApi, GetTeamMemberProfileApi, PostAddTeamMemberApi, PostTeamMemberVerifyApi, PutEditTeamMemberApi } from "@/api/user/team-member/teamApis";

type TeamData = {
  _id:string;
  email: string;
  name: string;
  contact_number?: string;
  role?: string;
  sort_field?: string;
  sort_order?: string,
  page?: any;
  items_per_page?: number;
  search?: string;
  agency_id?: string;
  client_id?: string;
}

type DeleteTeamMemberData = {
  teamMemberIds: string[];
  agency_id?: string;
}
type GetTeamMemberProfileApiData = {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  first_name: string;
  last_name: string;
  user_type: string;
  agency_id: string;
  member_role: string;
};

type PostTeamMemberVerifyData = {
  email: string;
  agency_id: string;
  redirect: boolean;
  token?: string;
  client_id?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

interface TeamMemberDataResponse {
  status : boolean;
  message : string
}

const initialState = {
  loading: false,
  user: {},
  data:[],
  teamMember: '',
  clientId: '',
  clientName: '',
  getAllTeamMemberStatus: '',
  addTeamMemberStatus: '',
  editTeamMemberStatus: '',
  deleteTeamMemberStatus: '',
  getTeamMemberProfileStatus: '',
  verifyTeamMemberStatus: ''
};

export const addTeamMember: any = createAsyncThunk(
  "team/addTeamMember",
  async (data: TeamData) => {
    const apiData={
      id: data._id,
      email: data.email,
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
      agency_id: data?.agency_id
    }
    try {
      const response: any = await PostAddTeamMemberApi(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamMemberDataResponse;
    }
  }
);

export const verifyTeamMember: any = createAsyncThunk(
  "team/verifyTeamMember",
  async (data: PostTeamMemberVerifyData) => {
    try {
      const response: any = await PostTeamMemberVerifyApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message, code: error.response.data.status } as any;
    }
  }
);

export const editTeamMember: any = createAsyncThunk(
  "team/editTeamMember",
  async (data: TeamData) => {
    const apiData={
      id: data._id,
      email: data.email,
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
      agency_id: data?.agency_id
    }
    try {
      const response: any = await PutEditTeamMemberApi(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamMemberDataResponse;
    }
  }
);
export const getAllTeamMember: any = createAsyncThunk(
  "teamMember/getAllTeamMember",
  async (data: TeamData) => {
    try {
      const response: any = await GetAllTeamMemberApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamMemberDataResponse;
    }
  }
);
export const getTeamMemberProfile: any = createAsyncThunk(
  "teamMember/getTeamMemberProfile",
  async (data: GetTeamMemberProfileApiData) => {
    const apiData = {
      _id: data?._id,
      name: data?.name,
      email: data?.email,
      status: data?.status,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      first_name: data?.first_name,
      last_name: data?.last_name,
      user_type: data?.user_type,
      agency_id: data?.agency_id,
      member_role: data?.member_role,
    };
    try {
      const response: any = await GetTeamMemberProfileApi(apiData);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamMemberDataResponse;
    }
  }
);
export const deleteTeamMember: any = createAsyncThunk(
  "teamMember/deleteTeamMember",
  async (data: DeleteTeamMemberData) => {
    try {
      const apiData = {
        teamMemberIds: data.teamMemberIds,
        agency_id: data?.agency_id
      }
      const response: any = await DeleteTeamMemberApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as TeamMemberDataResponse;
    }
  }
);


export const teamSlice = createSlice({
  name: "teamMember",
  initialState,
  reducers: {

    RemoveTeamMemberData(state) {
      return {
        ...state,
        teamMember: ''
      };
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(addTeamMember.pending, (state) => {
          return{
            ...state,
            loading: true,
            addTeamMemberStatus: 'pending'
          }
      })
      .addCase(addTeamMember.fulfilled, (state,action) => {
        if(action.payload.success === true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          // user: action.payload,
          loading: false,
          addTeamMemberStatus: 'success'
        }
      })
      .addCase(addTeamMember.rejected, (state) => {
        return{
          ...state,
          loading: false,
          addTeamMemberStatus: 'error'
        }
      });

      // new cases for verify team member
      builder
      .addCase(verifyTeamMember.pending, (state) => {
          return{
            ...state,
            loading: true,
            verifyTeamMemberStatus: 'pending'
          }
      })
      .addCase(verifyTeamMember.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
          localStorage.clear();
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          // user: action.payload,
          loading: false,
          verifyTeamMemberStatus: 'success'
        }
      })
      .addCase(verifyTeamMember.rejected, (state) => {
        return{
          ...state,
          loading: false,
          verifyTeamMemberStatus: 'error'
        }
      });
      // new cases for edit team member
      builder
      .addCase(editTeamMember.pending, (state) => {
          return{
            ...state,
            loading: true,
            editTeamMemberStatus: 'pending'
          }
      })
      .addCase(editTeamMember.fulfilled, (state,action) => {
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          // user: action.payload,
          loading: false,
          editTeamMemberStatus: 'success'
        }
      })
      .addCase(editTeamMember.rejected, (state) => {
        return{
          ...state,
          loading: false,
          editTeamMemberStatus: 'error'
        }
      });
      // new cases for get all team member
      builder
      .addCase(getAllTeamMember.pending, (state) => {
          return{
            ...state,
            loading: true,
            getAllTeamMemberStatus: 'pending'
          }
      })
      .addCase(getAllTeamMember.fulfilled, (state,action) => {
        if(action.payload.status == false){
          toast.error(action.payload.message)
        } 
        return{
          ...state,
          data: action.payload.data,
          loading: false,
          getAllTeamMemberStatus: 'success'
        }
      })
      .addCase(getAllTeamMember.rejected, (state) => {
        return{
          ...state,
          loading: false,
          getAllTeamMemberStatus: 'error'
        }
      });
      // new cases for get team member profile
      builder
      .addCase(getTeamMemberProfile.pending, (state) => {
          return{
            ...state,
            loading: true,
            getTeamMemberProfileStatus: 'pending'
          }
      })
      .addCase(getTeamMemberProfile.fulfilled, (state,action) => {
        return{
          ...state,
          teamMember: action.payload.data,
          loading: false,
          getTeamMemberProfileStatus: 'success'
        }
      })
      .addCase(getTeamMemberProfile.rejected, (state) => {
        return{
          ...state,
          loading: false,
          getTeamMemberProfileStatus: 'error'
        }
      });
      // new cases for delete team member profile
      builder
      .addCase(deleteTeamMember.pending, (state) => {
          return{
            ...state,
            loading: true,
            deleteTeamMemberStatus: 'pending'
          }
      })
      .addCase(deleteTeamMember.fulfilled, (state,action) => {
        if(action.payload.status == false){
          toast.error(action.payload.message)
          return{
            ...state,
          //   data: action.payload,
            loading: false,
            deleteTeamMemberStatus: 'error'
          }
      } else {
          toast.success(action.payload.message)
          return{
            ...state,
          //   data: action.payload,
            loading: false,
            deleteTeamMemberStatus: 'success'
          }
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

export const { RemoveTeamMemberData } = teamSlice.actions;
export default teamSlice.reducer;