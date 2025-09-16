/* eslint-disable camelcase */
import React, { useReducer, JSX } from "react";

import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import { useEmailValidate, useCreateSubmission } from "@/hooks";

const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

type State = {
    firstName: string;
    lastName: string;
    email: string;
    errors: {
        email?: string;
    };
};

type Action = {
    [key: string]: string;
};

const reducer = (state: State, action: Action): State => {
    let error;

    switch (action.type) {
        case "firstName":
            return { ...state, firstName: action.value };
        case "lastName":
            return { ...state, lastName: action.value };
        case "email":
            if (!validEmail.test(action.value.toLowerCase())) {
                error = "Please enter a valid email address";
            }
            return {
                ...state,
                email: action.value,
                errors: { ...state.errors, email: error },
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const init = {
    firstName: "",
    lastName: "",
    email: "",
    errors: {},
};

const Contact = (): JSX.Element => {
    const { slug } = useParams();

    const [state, dispatch] = useReducer(reducer, init);
    const formCheck = useEmailValidate(state);

    const data = {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
    };

    const url = `/.netlify/functions/registration`;
    const { submitting, error, submitted, createSubmission } =
        useCreateSubmission(url, data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    };

    if (slug === "contact")
        return (
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                {submitted && (
                    <DoneIcon sx={{ fontSize: 100, color: "success.main" }} />
                )}
                <Typography
                    gutterBottom
                    align="center"
                    variant="h4"
                    sx={{ mt: 6, mb: 2 }}>
                    {error.state && error.message}
                    {!submitted
                        ? "Sign up to my newsletter for exclusive monthly updates."
                        : "Thank you for signing up!"}
                </Typography>
                {!submitted && (
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    size="medium"
                                    name="firstName"
                                    onChange={handleChange}
                                    fullWidth
                                    label="First Name"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    size="medium"
                                    name="lastName"
                                    onChange={handleChange}
                                    type="text"
                                    fullWidth
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    name="email"
                                    size="medium"
                                    helperText={state.errors.email}
                                    error={state.errors.email ? true : false}
                                    onChange={handleChange}
                                    type="email"
                                    fullWidth
                                    label="Email Address"
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    disabled={!formCheck}
                                    loading={submitting}
                                    onClick={createSubmission}>
                                    Subscribe
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </Stack>
        );
    return <></>;
};

export default Contact;
