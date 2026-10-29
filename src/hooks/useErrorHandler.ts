import { useState, useEffect, useCallback } from "react";

type ErrorHandler = {
    state: boolean;
    message: string;
};

export const useErrorHandler = () => {
    const [error, setError] = useState<ErrorHandler>({
        state: false,
        message: "",
    });

    useEffect(() => {
        if (error.state) {
            console.error(error.message);
        }
    }, [error]);

    const handleError = useCallback((message: string): void => {
        setError({ state: Boolean(message), message });
    }, []);

    return { error, handleError };
};
