import { http, HttpResponse } from 'msw'
import * as mock from '../../data/mock'

const limit = 5

export const handlers = [

    // get installation:
    http.get(`/api/v1/shop/${mock.shop.shopId}/services`, ({ request }) => {
        const url = new URL(request.url)
        const pageNum = Number(url.searchParams.get('page'))
        return HttpResponse.json({
            items: mock.services.filter((form, i) => (
                (i >= ((pageNum - 1) * limit)) && (i < (pageNum * limit))
            )),
            limit,
            page: pageNum,
            totalItems: mock.services.length,
            totalPages: Math.ceil(mock.services.length / limit)
        })
    })

]
