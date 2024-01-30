import { DeleteClientApi, GetAllCityApi, GetAllClientApi, GetAllCountryApi, GetAllStateApi, GetClientAgenciesApi, GetClientByIdApi, PatchEditClientApi, PostAddClientApi, PostVerifyClientApi } from "@/api/user/client/clientApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type AddClientData = {
  name: string;
  email: string;
  company_name: string;
  company_website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  title?: string;
  contact_number?: string;
}

type EditClientData = {
  clientId: string,
  name: string;
  email: string;
  company_name: string;
  company_website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  title?: string;
  contact_number?: string;
}

type VerifyClientData = {
  email: string;
  agency_id: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  redirect: boolean;
}

type GetAllClientData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
}

type GetClientByIdData = {
  clientId: string;
}

type DeleteClientData = {
  client_ids: string[];
}

type MasterData = {
  search?: string;
  stateId?: string;
  countryId?: string;
}
interface PostAPIResponse {
  status: boolean;
  message: string
}
interface ClientInitialState {
  loading: boolean;
  data: any;
  client: any;
  countries: any;
  states: any;
  cities: any;
  agencies: any;
  agencyId: string;
  agencyName: string;
  addClientStatus: string;
  verifyClientStatus: string;
  getAllClientStatus: string;
  getClientStatus: string;
  editClientStatus: string;
  deleteClientStatus: string;
  getClientProfileStatus: string;
}

const initialState: ClientInitialState = {
  loading: false,
  data: '',
  client: '',
  countries: '',
  states: '',
  cities: '',
  agencies: '',
  agencyId: '',
  agencyName: '',
  addClientStatus: '',
  verifyClientStatus: '',
  getAllClientStatus: '',
  getClientStatus: '',
  editClientStatus: '',
  deleteClientStatus: '',
  getClientProfileStatus: '',
};

export const postAddClient: any = createAsyncThunk(
  "client/postAddClient",
  async (data: AddClientData) => {
    try {
      const response: any = await PostAddClientApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const postVerifyClient: any = createAsyncThunk(
  "client/postVerifyClient",
  async (data: VerifyClientData) => {
    try {
      const response: any = await PostVerifyClientApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const patchEditClient: any = createAsyncThunk(
  "client/patchEditClient",
  async (data: EditClientData) => {
    try {
      const response: any = await PatchEditClientApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getAllClient: any = createAsyncThunk(
  "client/getAllClient",
  async (data: GetAllClientData) => {
    try {
      const response: any = await GetAllClientApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getClientById: any = createAsyncThunk(
  "client/getClientById",
  async (data: GetClientByIdData) => {
    try {
      const response: any = await GetClientByIdApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const deleteClient: any = createAsyncThunk(
  "client/deleteClient",
  async (data: DeleteClientData) => {
    try {
      const response: any = await DeleteClientApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getCountry: any = createAsyncThunk(
  "client/getCountry",
  async (data: MasterData) => {
    try {
      const response: any = await GetAllCountryApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getState: any = createAsyncThunk(
  "client/getState",
  async (data: MasterData) => {
    try {
      const response: any = await GetAllStateApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getCities: any = createAsyncThunk(
  "client/getCities",
  async (data: MasterData) => {
    try {
      const response: any = await GetAllCityApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getClientAgencies: any = createAsyncThunk(
  "client/getClientAgencies",
  async () => {
    try {
      const response: any = await GetClientAgenciesApi();
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    RemoveRegionalData(state) {
      return {
        ...state,
        // countries: '',
        states: '',
        cities: '',
      }
    },
    RemoveClientData(state) {
      return {
        ...state,
        client: ''
      }
    },
    setAgencyId(state, action) {
      return {
        ...state,
        agencyId: action.payload
      }
    },
    setAgencyName(state, action) {
      return {
        ...state,
        agencyName: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          addClientStatus: 'pending'
        }
      })
      .addCase(postAddClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          addClientStatus: 'success'
        }
      })
      .addCase(postAddClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addClientStatus: 'error'
        }
      });
    // new cases for Verify client
    builder
      .addCase(postVerifyClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          verifyClientStatus: 'pending'
        }
      })
      .addCase(postVerifyClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          verifyClientStatus: 'success'
        }
      })
      .addCase(postVerifyClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          verifyClientStatus: 'error'
        }
      });
    // new cases for Edit client
    builder
      .addCase(patchEditClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          editClientStatus: 'pending'
        }
      })
      .addCase(patchEditClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          editClientStatus: 'success'
        }
      })
      .addCase(patchEditClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          editClientStatus: 'error'
        }
      });

    // new cases for get all client
    builder
      .addCase(getAllClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          getAllClientStatus: 'pending'
        }
      })
      .addCase(getAllClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        }
        return {
          ...state,
          data: action?.payload?.data,
          loading: false,
          getAllClientStatus: 'success'
        }
      })
      .addCase(getAllClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getAllClientStatus: 'error'
        }
      });
    // new cases for get client
    builder
      .addCase(getClientById.pending, (state) => {
        return {
          ...state,
          loading: true,
          getClientStatus: 'pending'
        }
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          client: action?.payload?.data,
          loading: false,
          getClientStatus: 'success'
        }
      })
      .addCase(getClientById.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getClientStatus: 'error'
        }
      });
    // new cases for delete client
    builder
      .addCase(deleteClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          deleteClientStatus: 'pending'
        }
      })
      .addCase(deleteClient.fulfilled, (state,action) => {
        if(action.payload.status == false){
            toast.error(action.payload.message)
            return{
              ...state,
            //   data: action.payload,
            loading: false,
            deleteClientStatus: 'error'
          }
        } else {
          toast.success(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteClientStatus: 'success'
          }
        }
      })
      .addCase(deleteClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          deleteClientStatus: 'error'
        }
      });
    // new cases for get countries
    builder
      .addCase(getCountry.fulfilled, (state, action) => {
        return {
          ...state,
          countries: action.payload.data,
        }
      });
    // new cases for get states
    builder
      .addCase(getState.fulfilled, (state, action) => {
        return {
          ...state,
          states: action.payload.data,
        }
      });
    // new cases for get cities
    builder
      .addCase(getCities.fulfilled, (state, action) => {
        return {
          ...state,
          cities: action.payload.data,
        }
      });
    // new cases for get agencies list
    builder
      .addCase(getClientAgencies.fulfilled, (state, action) => {
        const fullName = action?.payload?.data[0]?.first_name + " " + action?.payload?.data[0]?.last_name
        return {
          ...state,
          agencies: action?.payload?.data,
          agencyId: action?.payload?.data[0]?.reference_id,
          agencyName: fullName
        }
      });
  },
});

export const { RemoveRegionalData, RemoveClientData, setAgencyId, setAgencyName } = clientSlice.actions;
export default clientSlice.reducer;
