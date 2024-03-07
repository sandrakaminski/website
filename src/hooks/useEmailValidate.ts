type ValidEmail = {
    email: string;
    firstName: string;
    lastName: string;
    errors: {
        [x: string]: string;
    };
}

export const useEmailValidate = (state: ValidEmail): boolean => {
    if (!state.email || !state.firstName || !state.lastName) {
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