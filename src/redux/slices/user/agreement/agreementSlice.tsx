import { DeleteAgencyAgreementsApi, DownloadAgreement, GetAllAgreementApi, GetSingleAgreementByIdApi, SendAgreement } from "@/commonAPIs/userAPIs/agency-apis/agreement/agencyAgreementAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* Agency Agreement List */

// Agency Agreement list API types
type GetAllAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

// Agency Agreement list api Call
export const getAllAgencyagreement: any = createAsyncThunk(
    "agreement/getAllAgencyagreement",
    async (data: GetAllAgreementlistApiData) => {
        try {
            const response: any = await GetAllAgreementApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



/* Agency Agreement Delete */
type DeleteAgencyAgreement = {
    id: string[] | string;
}

export const deleteAgencyAgreement: any = createAsyncThunk(
    "agreement/deleteAgencyAgreement",
    async (data: DeleteAgencyAgreement) => {
        try {
            const response: any = await DeleteAgencyAgreementsApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Send Agreement list API types
type SendAgreementApiData = {
    agreementId: string;
}

// Send Agreement list api Call
export const sendAgreement: any = createAsyncThunk(
    "agreement/sendAgreement",
    async (data: SendAgreementApiData) => {
        try {
            const response: any = await SendAgreement(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Download Agreement

// Download Agreement list API types
type DownloadAgreementApiData = {
    id: string;
}


export const downloadAgreement: any = createAsyncThunk(
    "agreement/downloadAgreement",
    async (data: DownloadAgreementApiData) => {
        try {
            const response: any = await DownloadAgreement(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// get A Single Aggrement By Id

type GetAgreementByIdApiData = {
    id: string;
}

export const getSingleagreement: any = createAsyncThunk(
    "agreement/getSingleagreement",
    async (data: GetAgreementByIdApiData) => {
        try {
            const response: any = await GetSingleAgreementByIdApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Slice initial States types
interface AgencyAgreementInitialState {
    loading: boolean;
    agreementDetails: any;
    singleAgreementdetails: any
}

// Slice initial States
const initialState: AgencyAgreementInitialState = {
    loading: false,
    agreementDetails: {},
    singleAgreementdetails: {}
};


export const agencyAgreementSlice = createSlice({
    name: "agreement",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        // Agency Agreement list cases
        builder
            .addCase(getAllAgencyagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllAgencyagreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllAgencyagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Agency Agreement delete
        builder
            .addCase(deleteAgencyAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteAgencyAgreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(deleteAgencyAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Send Agreement

        builder
            .addCase(sendAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(sendAgreement.fulfilled, (state, action) => {
                if (action.payload.status == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(sendAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Download Agreement

        builder
            .addCase(downloadAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(downloadAgreement.fulfilled, (state, action) => {
                if (action.payload.status == true) {
                    toast.success(action.payload.message)
                } else {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(downloadAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });

        // Get Single Agreement Details

        builder
            .addCase(getSingleagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getSingleagreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    singleAgreementdetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getSingleagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    }
});

export default agencyAgreementSlice.reducer;