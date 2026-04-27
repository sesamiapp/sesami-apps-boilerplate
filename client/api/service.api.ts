import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSesami_AdminAppLoader } from '../hooks'
import { apiRequest } from './api-handler'

//get installation:
export const useServices = (pageNum: number) => {

    const Sesami = useSesami_AdminAppLoader()

    return useQuery({
        queryKey: ['services', pageNum],
        queryFn: () => apiRequest(Sesami?.getToken)(`/api/v1/shop/${Sesami?.getShopId()}/services?page=${pageNum}`),
        placeholderData: keepPreviousData,
        staleTime: 1*60*1000,
        enabled: (Sesami !== null)
    })
    
}
