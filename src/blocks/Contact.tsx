/* eslint-disable camelcase */
import React, { useState, useReducer } from 'react';

import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from 'react-router-dom';

import { emailValid, createSubmission } from '@/functions';

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

type State = {
    firstName: string;
    lastName: string;
    email: string;
    errors: {
        email?: string;
    };
}

type Action = {
    [key: string]: string;
}

const reducer = (state: State, action: Action): State => {
    let error

    switch (action.type) {
        case 'firstName':
            return { ...state, firstName: action.value };
        case 'lastName':
            return { ...state, lastName: action.value };
        case 'email':
            if (!validEmail.test(action.value.toLowerCase())) {
                error = "Please enter a valid email address";
            }
            return { ...state, email: action.value, errors: { ...state.errors, email: error } };
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const init = {
    firstName: "",
    lastName: "",
    email: "",
    errors: {}
};

const Contact = () => {
    const { slug } = useParams();

    const [state, dispatch] = useReducer(reducer, init);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const formCheck = emailValid(state);

    const handleSubmit = () => {
        setSubmitting(true);

        const data = {
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
        };

        const url = `/.netlify/functions/registration`;
        createSubmission({ url, data, setSubmitting, setSubmitted });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    }

    if (slug === 'contact')
        return (
            <Stack
                sx={{ mt: 10 }}
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                {submitted && <DoneIcon sx={{ fontSize: 100, color: 'success.main' }} />}
                <Typography gutterBottom align="center" variant="h4" sx={{ mt: 6, mb: 2 }}>
                    {!submitted ? "Sign up to my newsletter for exclusive monthly updates." : "Thank you for signing up!"}
                </Typography>
                {!submitted &&
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6} >
                                <TextField
                                    size="medium"
                                    name="firstName"
                                    onChange={handleChange}
                                    fullWidth
                                    label="First Name"
                                />
                            </Grid>
                            <Grid xs={12} sm={6} >
                                <TextField
                                    size="medium"
                                    name="lastName"
                                    onChange={handleChange}
                                    type="text"
                                    fullWidth
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid xs={12} >
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
                            <Grid xs={12} >
                                <LoadingButton disabled={!formCheck} loading={submitting} onClick={handleSubmit}>
                                    Subscribe
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Container>
                }
            </Stack>
        )
    return <></>
};

export default Contact;