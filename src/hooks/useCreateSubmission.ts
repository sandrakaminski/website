

type Submission = {
    url: string;
    method?: string;
    data: object;
    setSubmitting: (submitting: boolean) => void;
    setSubmitted: (submitted: boolean) => void;
}

export const createSubmission = async (props: Submission): Promise<void> => {
    const { url, method, data, setSubmitting, setSubmitted } = props;

    try {
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

};

export default createSubmission;