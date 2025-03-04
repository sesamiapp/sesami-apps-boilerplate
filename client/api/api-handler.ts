export const apiRequest = (getToken?: () => Promise<string | null>) => async (
    url: string | URL,
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH',
    body?: any
): Promise<any> => {
    
    let headers: HeadersInit = {
        'Content-Type': 'application/json'
    }

    if(getToken){
        const token = await getToken()
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        }
    }
    
    const response = await fetch(url, { method, headers, body })
    
    //status:
    if(!response.ok){
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
        return response.json().catch((err) => {
            throw new Error(`Failed to parse JSON: ${err.message}`);
        });
    }

    return response.text();
}
