export const fetchJSON = async (req: any) => {
    const { url, method, headers, body } = req;

    try {
        const res = await fetch(
            url,
            {
                method: method || 'GET',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: body ? JSON.stringify(body) : null,
            }
        );
        const j = await res.json();
        if (!res.ok) {
            if (j.message) {
                return { error: j.message };
            }
            return { error: `${res.status} ${res.statusText}` };
        }
        return j;
    } catch (e) {
        return { error: e }
    }
};
