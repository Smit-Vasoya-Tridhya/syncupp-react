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
        url: "/api/v1/agency/agreement/get-all-agreement",
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
        url: `/api/v1/agency/agreement/delete-agreement`,
        method: "POST",
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

export const GetSingleAgreementByIdApi = async (data: GetAgreementByIdApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/agency/agreement/get-agreement/${data}`,
        method: "GET",
        // data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



// get A Single Aggrement By Id

type SendAgreementApiData = {
    agreementId: string;
}

export const SendAgreement = async (data: SendAgreementApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/agency/agreement/send-agreement`,
        method: "POST",
        data: { agreementId: data },
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


// Download pdf
type DownloadAgreementApiData = {
    id: string;
}

export const DownloadAgreement = async (data: DownloadAgreementApiData) => {
    const customHeaders = {
        // Add any additional headers you need for this specific request
        responseType: "application/pdf",
    };

    const response = await AxiosDefault({
        url: `/api/v1/agency/agreement/download-pdf/${data}`,
        method: "GET",
        // data: { agreementId: data },
        contentType: "application/pdf",
        customHeaders
    });

    // console.log(response?.data?.data?.data,'response')

    // Set headers on the frontend
    const contentType = 'application/pdf';
    const contentDisposition = 'attachment; filename="document.pdf"';


    // Convert the numeric array to a Uint8Array
    const uint8Array = new Uint8Array(response?.data?.data?.data);

    // Convert Uint8Array to Blob
    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(blob);



    // Create a link element and simulate a click to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = contentDisposition.split('=')[1].replace(/"/g, '');
    link.click();

    const responseData = response?.data?.data?.data;
    return responseData;
};