import { useState } from "react";

import { useErrorHandler } from "./useErrorHandler";

type Submission = {
    url: string;
    method?: string;
    data: object;
};

type RespBody = {
    submitting: boolean;
    error: {
        state: boolean;
        message: string;
    };
    submitted: boolean;
    createSubmission: () => void;
}

export const useCreateSubmission = (props: Submission): RespBody => {
    const { url, method, data } = props;
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { error, handleError } = useErrorHandler();

    const createSubmission = async (): Promise<void> => {
        try {
            setSubmitting(true);
            const resp = await fetch(url, {
                method: "POST" || method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (resp.status === 200) {
                console.log(resp);
                setSubmitting(false);
                setSubmitted(true);
            } else {
                throw new Error(`Error submitting data ${resp.status}`);
            }
        }
        catch (error) {
            handleError("Entry cannot be submitted, try again later.");
            setSubmitting(false);
        }
    }

    return { submitting, error, submitted, createSubmission };
};

export default useCreateSubmission;