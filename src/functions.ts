type ValidEmail = {
    email: string;
    errors: {
        [x: string]: string;
    };
}

// checks if the email entered is a valid email
export const emailValid = (state: ValidEmail): boolean => {
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
    method?: string;
    data: object;
    setSubmitting: (submitting: boolean) => void;
    setSubmitted: (submitted: boolean) => void;
}

export const createSubmission = async (props: Submission): Promise<void> => {
    const { url, method, data, setSubmitting, setSubmitted } = props;

    try {
        const resp = await fetch(url, {
            method: method ? method : 'POST',
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

type ImgSrc = {
    setLoad: (load: boolean) => void;
    src: string;
}

export const imageSrc = (props: ImgSrc): string => {
    const { setLoad, src } = props;
    setLoad(true);
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
        setLoad(false);
    }
    return src;
}

