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

            if (!res.ok) {
                handleError("Cannot fetch entries, try again later.");
                setLoading(false);
                return;
            }

            try {
                const data = await res.json();
                setResponse(data);
            } catch {
                handleError("Invalid JSON response from server");
            }
        } catch (err) {
            handleError("Cannot fetch entries, try again later.");
        }
        finally {
            setLoading(false);
        }
    }, [loading, id, endpoint, handleError]);

    const rerender = () => {
        setLoading(true);
        handleGet();
    };

    return { loading, error, response, handleGet, rerender };
};