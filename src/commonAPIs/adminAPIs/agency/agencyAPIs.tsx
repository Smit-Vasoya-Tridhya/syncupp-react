import AxiosDefault from "@/services/AxiosDefault";


// Agency List
type GetAllAgencylistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

export const GetAllAgencyApi = async (data: GetAllAgencylistApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/admin/agencies",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



//Delete Agency list

type DeleteAgency = {
    agencies: string[];
    status?: string | boolean
    is_deleted?: boolean
}

export const DeleteAgencysApi = async (data: DeleteAgency) => {
    const response = await AxiosDefault({
        url: `/api/v1/admin/update-agency`,
        method: "PATCH",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};