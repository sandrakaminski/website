import { useState } from "react";

type Submission = {
    url: string;
    method?: string;
    data: object;
};

type RespBody = {
    submitting: boolean;
    submitted: boolean;
    createSubmission: () => void;
}

export const useCreateSubmission = (props: Submission): RespBody => {
    const { url, method, data } = props;
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

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
            if (resp.ok) {
                setSubmitting(false);
                setSubmitted(true);
            } else {
                console.error(resp);
                setSubmitting(false);
            }
        }
        catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    }

    return { submitting, submitted, createSubmission };
};

export default useCreateSubmission;