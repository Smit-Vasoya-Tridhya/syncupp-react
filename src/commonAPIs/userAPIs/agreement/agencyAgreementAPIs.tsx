import AxiosDefault from "@/services/AxiosDefault";

// Agency Agreement List
type GetAllAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

export const GetAllAgreementApi = async (data: GetAllAgreementlistApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/agency/get-all-agreement",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


//Delete Agency Agreement 

type DeleteAgencyAgreement = {
    id: string[] | string
}

export const DeleteAgencyAgreementsApi = async (data: DeleteAgencyAgreement) => {
    const response = await AxiosDefault({
        url: `/api/v1/agency/delete-agreement`,
        method: "PATCH",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};

// get A Single Aggrement By Id

type GetAgreementByIdApiData = {
    id: string;
}

export const GetClientByIdApi = async (data: GetAgreementByIdApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/agency/get-agreement/${data.id}`,
        method: "GET",
        // data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};