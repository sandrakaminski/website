type ValidEmail = {
    email: string;
    errors: {
        [x: string]: string;
    };
}

// checks if the email entered is a valid email
export const emailValid = (state: ValidEmail) => {
    if (!state.email) {
        return false;
    }

    for (const err in state.errors) {
        if (state.errors[err]) {
            return false;
        }
    }

    return true;
};

type Submission = {
    url: string;
    data: object;
    setSubmitting: (submitting: boolean) => void;
    setSubmitted: (submitted: boolean) => void;
}

export const createSubmission = async (props: Submission) => {
    const { url, data, setSubmitting, setSubmitted } = props;

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    }
}