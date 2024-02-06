import { useState } from "react";

export const useFetchEntries = <T>(id: string, endpoint: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<T>();

    const handleGet = async (): Promise<void> => {
        const q = new URLSearchParams();
        q.append("searchText", id);
        const url = `${endpoint}?${q.toString()}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
            setLoading(false);
            setResponse(data);
        }
    }

    return { loading, response, handleGet }
};