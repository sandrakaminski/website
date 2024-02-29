import { useState, useCallback } from "react";

import { useErrorHandler } from "./useErrorHandler";

export const useFetchEntries = <T>(id: string, endpoint: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<T>();
    const { error, handleError } = useErrorHandler();

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
        } catch (err) {
            handleError("Cannot fetch entries, try again later.");
            setLoading(false);
        }
    }, [id, endpoint, loading, handleError]);

   const rerender = () => {
        setLoading(true);
        handleGet();
    };

    return { loading, error, response, handleGet, rerender };
};