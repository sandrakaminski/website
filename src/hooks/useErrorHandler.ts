import { useState, useEffect } from "react";

type ErrorHandler = {
    state: boolean;
    message: string;
}

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

    const handleError = (message: string): void => {
        setError({ state: true, message });
    };

    return { error, handleError };
};