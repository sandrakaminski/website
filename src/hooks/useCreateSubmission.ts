import { useState } from "react";

import { useErrorHandler } from "./useErrorHandler";

type RespBody = {
    submitting: boolean;
    error: {
        state: boolean;
        message: string;
    };
    submitted: boolean;
    createSubmission: () => void;
}

export const useCreateSubmission = (url: string, data?: object, method?: string): RespBody => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { error, handleError } = useErrorHandler();

    const createSubmission = async (): Promise<void> => {
        try {
            setSubmitting(true);
            const resp = await fetch(url, {
                method: method || "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (resp.status === 200) {
                setSubmitting(false);
                setSubmitted(true);
            } else {
                handleError("Cannot submit entry, try again later.");
                throw new Error(`Error submitting data ${resp.status}`);
            }
        }
        catch {
            handleError("Entry cannot be submitted, try again later.");
            setSubmitting(false);
        }
    }

    return { submitting, error, submitted, createSubmission };
};

export default useCreateSubmission;