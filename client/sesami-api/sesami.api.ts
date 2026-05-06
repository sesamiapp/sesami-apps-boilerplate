import { sesamiRequest } from './sesami-request';

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
    payload: CreateResourceRequestPayload;
}

export interface RetrieveServicesParams {
    limit: number;
    after?: string;
    before?: string;
    searchTerm?: string;
    status?: boolean;
}

export interface RetrieveResourcesParams {
    limit: number;
    after?: string;
    before?: string;
    searchTerm?: string;
    status?: boolean;
}

export interface RetrieveServiceByIdParams {
    id: string;
}

export interface RetrieveResourceByIdParams {
    id: string;
}

export interface UpdateServiceParams {
    id: string;
    payload: Record<string, unknown>;
}

export interface UpdateResourceRequestPayload {
    typeId?: string;
    name?: string;
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

export interface UpdateResourceParams {
    id: string;
    payload: UpdateResourceRequestPayload;
}

export interface DeleteResourceParams {
    id: string;
}

export const createResourceRequest = async (params: CreateResourceRequestParams) => {
    const url = `/api/sesami/resources`;
    return sesamiRequest()(url, 'POST', params.payload);
};

export const retrieveServicesRequest = async (params: RetrieveServicesParams) => {
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

    const url = `/api/sesami/services?${searchParams.toString()}`;
    return sesamiRequest()(url, 'GET');
};

export const retrieveServiceByIdRequest = async (params: RetrieveServiceByIdParams) => {
    const url = `/api/sesami/services/${encodeURIComponent(params.id)}`;
    return sesamiRequest()(url, 'GET');
};

export const updateServiceRequest = async (params: UpdateServiceParams) => {
    const url = `/api/sesami/services/${encodeURIComponent(params.id)}`;
    return sesamiRequest()(url, 'PATCH', params.payload);
};

export const retrieveResourceByIdRequest = async (params: RetrieveResourceByIdParams) => {
    const url = `/api/sesami/resources/${encodeURIComponent(params.id)}`;
    return sesamiRequest()(url, 'GET');
};

export const updateResourceRequest = async (params: UpdateResourceParams) => {
    const url = `/api/sesami/resources/${encodeURIComponent(params.id)}`;
    return sesamiRequest()(url, 'PATCH', params.payload);
};

export const deleteResourceRequest = async (params: DeleteResourceParams) => {
    const url = `/api/sesami/resources/${encodeURIComponent(params.id)}`;
    return sesamiRequest()(url, 'DELETE');
};

export const retrieveResourcesRequest = async (params: RetrieveResourcesParams) => {
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

    const url = `/api/sesami/resources?${searchParams.toString()}`;
    return sesamiRequest()(url, 'GET');
};

