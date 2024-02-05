type ValidEmail = {
    email: string;
    errors: {
        [x: string]: string;
    };
}

export const useEmailValidate = (state: ValidEmail): boolean => {
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

export default useEmailValidate;