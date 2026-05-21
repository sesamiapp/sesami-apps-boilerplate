import { sesamiRequest } from './sesami-request';

export interface SesamiProxyParams {
    shopId: string;
}

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

export interface CreateResourceRequestParams extends SesamiProxyParams {
    payload: CreateResourceRequestPayload;
}

export interface RetrieveServicesParams extends SesamiProxyParams {
    limit: number;
    after?: string;
    before?: string;
    searchTerm?: string;
    status?: boolean;
}

export interface RetrieveResourcesParams extends SesamiProxyParams {
    limit: number;
    after?: string;
    before?: string;
    searchTerm?: string;
    status?: boolean;
}

export interface RetrieveServiceByIdParams extends SesamiProxyParams {
    id: string;
}

export interface RetrieveResourceByIdParams extends SesamiProxyParams {
    id: string;
}

export interface UpdateServiceParams extends SesamiProxyParams {
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

export interface UpdateResourceParams extends SesamiProxyParams {
    id: string;
    payload: UpdateResourceRequestPayload;
}

export interface DeleteResourceParams extends SesamiProxyParams {
    id: string;
}

export const createResourceRequest = async ({
    shopId,
    payload,
}: CreateResourceRequestParams) => {
    const url = `/api/sesami/resources`;
    return sesamiRequest(shopId)(url, 'POST', payload);
};

export const retrieveServicesRequest = async ({
    shopId,
    limit,
    after,
    before,
    searchTerm,
    status,
}: RetrieveServicesParams) => {
    const searchParams = new URLSearchParams();
    searchParams.set('limit', String(limit));

    if (after) {
        searchParams.set('after', after);
    }
    if (before) {
        searchParams.set('before', before);
    }
    if (searchTerm) {
        searchParams.set('searchTerm', searchTerm);
    }
    if (typeof status === 'boolean') {
        searchParams.set('status', String(status));
    }

    const url = `/api/sesami/services?${searchParams.toString()}`;
    return sesamiRequest(shopId)(url, 'GET');
};

export const retrieveServiceByIdRequest = async ({
    shopId,
    id,
}: RetrieveServiceByIdParams) => {
    const url = `/api/sesami/services/${encodeURIComponent(id)}`;
    return sesamiRequest(shopId)(url, 'GET');
};

export const updateServiceRequest = async ({
    shopId,
    id,
    payload,
}: UpdateServiceParams) => {
    const url = `/api/sesami/services/${encodeURIComponent(id)}`;
    return sesamiRequest(shopId)(url, 'PATCH', payload);
};

export const retrieveResourceByIdRequest = async ({
    shopId,
    id,
}: RetrieveResourceByIdParams) => {
    const url = `/api/sesami/resources/${encodeURIComponent(id)}`;
    return sesamiRequest(shopId)(url, 'GET');
};

export const updateResourceRequest = async ({
    shopId,
    id,
    payload,
}: UpdateResourceParams) => {
    const url = `/api/sesami/resources/${encodeURIComponent(id)}`;
    return sesamiRequest(shopId)(url, 'PATCH', payload);
};

export const deleteResourceRequest = async ({
    shopId,
    id,
}: DeleteResourceParams) => {
    const url = `/api/sesami/resources/${encodeURIComponent(id)}`;
    return sesamiRequest(shopId)(url, 'DELETE');
};

export const retrieveResourcesRequest = async ({
    shopId,
    limit,
    after,
    before,
    searchTerm,
    status,
}: RetrieveResourcesParams) => {
    const searchParams = new URLSearchParams();
    searchParams.set('limit', String(limit));

    if (after) {
        searchParams.set('after', after);
    }
    if (before) {
        searchParams.set('before', before);
    }
    if (searchTerm) {
        searchParams.set('searchTerm', searchTerm);
    }
    if (typeof status === 'boolean') {
        searchParams.set('status', String(status));
    }

    const url = `/api/sesami/resources?${searchParams.toString()}`;
    return sesamiRequest(shopId)(url, 'GET');
};
