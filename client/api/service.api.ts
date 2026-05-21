import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { retrieveServicesRequest } from '../sesami-api/sesami.api';

export const useServices = (shopId: string, pageNum: number) => {
    return useQuery({
        queryKey: ['services', shopId, pageNum],
        queryFn: () => retrieveServicesRequest({ shopId, limit: 50 }),
        placeholderData: keepPreviousData,
        staleTime: 1 * 60 * 1000,
    });
};
