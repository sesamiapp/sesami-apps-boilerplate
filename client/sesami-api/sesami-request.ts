type SesamiHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function sesamiRequest() {
    return async (
        url: string | URL,
        method: SesamiHttpMethod = 'GET',
        body?: unknown,
    ): Promise<any> => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, {
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

