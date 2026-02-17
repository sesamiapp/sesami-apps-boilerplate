import { apiRequest } from './api-handler';

const SESAMI_API_BASE_URL = 'https://api.sesami.co/api/v1';

export interface CreateResourceRequestPayload {
    typeId: string;
    name: string;
    timezone?: string;
    status?: boolean;
    email?: string;
    image?: string;
    availabilities?: Array<Record<string, unknown>>;
    availabilitiesRange?: Record<string, unknown>;
    description?: string;
    eventDescription?: string;
    mobile?: string;
    notificationEmailStatus?: boolean;
}

export interface CreateResourceRequestParams {
    shop: string;
    payload: CreateResourceRequestPayload;
}

export interface RetrieveServicesParams {
    shop: string;
    limit: number;
    after?: string;
    before?: string;
    searchTerm?: string;
    status?: boolean;
}

export const createResourceRequest = async (
    getToken: () => Promise<string | null>,
    params: CreateResourceRequestParams,
) => {
    const url = `${SESAMI_API_BASE_URL}/${encodeURIComponent(params.shop)}/resources`;
    return apiRequest(getToken)(url, 'POST', JSON.stringify(params.payload));
};

export const retrieveServicesRequest = async (
    getToken: () => Promise<string | null>,
    params: RetrieveServicesParams,
) => {
    const searchParams = new URLSearchParams();
    searchParams.set('limit', String(params.limit));

    if (params.after) {
        searchParams.set('after', params.after);
    }
    if (params.before) {
        searchParams.set('before', params.before);
    }
    if (params.searchTerm) {
        searchParams.set('searchTerm', params.searchTerm);
    }
    if (typeof params.status === 'boolean') {
        searchParams.set('status', String(params.status));
    }

    const url = `${SESAMI_API_BASE_URL}/${encodeURIComponent(params.shop)}/services?${searchParams.toString()}`;
    return apiRequest(getToken)(url, 'GET');
};

