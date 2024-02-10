import { useState, useCallback } from "react";

export const useFetchEntries = <T>(id: string, endpoint: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<T>();

    const handleGet = useCallback(async (): Promise<void> => {
        if (!loading) {
            return;
        }
        try {
            const q = new URLSearchParams();
            q.append("searchText", id);
            const url = `${endpoint}?${q.toString()}`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setLoading(false);
                setResponse(data);
            } else {
                throw new Error(`Error fetching data ${data.message || data.status}`);
            }
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [endpoint, id, loading]);

    return { loading, response, handleGet }
};