import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { retrieveServicesRequest } from '../sesami-api/sesami.api';

export const useServices = (pageNum: number) => {
    return useQuery({
        queryKey: ['services', pageNum],
        queryFn: () => retrieveServicesRequest({ limit: 50 }),
        placeholderData: keepPreviousData,
        staleTime: 1 * 60 * 1000,
    });
};
