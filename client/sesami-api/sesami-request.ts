type SesamiHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function appendShopId(url: string | URL, shopId?: string): string {
    const pathAndQuery = String(url);
    if (!shopId) {
        return pathAndQuery;
    }
    const parsed = new URL(pathAndQuery, 'http://localhost');
    parsed.searchParams.set('shopId', shopId);
    return `${parsed.pathname}${parsed.search}`;
}

export function sesamiRequest(shopId?: string) {
    return async (
        url: string | URL,
        method: SesamiHttpMethod = 'GET',
        body?: unknown,
    ): Promise<any> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(appendShopId(url, shopId), {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(
                `Sesami request failed ${response.status}: ${response.statusText}${
                    errorText ? ` - ${errorText}` : ''
                }`,
            );
        }

        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('application/json')) {
            return response.json().catch((err) => {
                throw new Error(`Failed to parse JSON: ${err.message}`);
            });
        }
        return response.text();
    };
}
