/* eslint-disable camelcase */
import React, { useReducer, JSX, useState } from "react";

import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import ErrorMessage from "@/components/ErrorMessage";
import InputField from "@/components/InputField";

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = {
    firstName: string;
    lastName: string;
    email: string;
    errors: {
        email?: boolean;
        firstName?: boolean;
        lastName?: boolean;
    };
};

type Action =
    | { type: "firstName"; value: string }
    | { type: "lastName"; value: string }
    | { type: "email"; value: string }
    | { type: "validate"; value: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "firstName":
            return { ...state, firstName: action.value };
        case "lastName":
            return { ...state, lastName: action.value };
        case "email":
            return { ...state, email: action.value };
        case "validate":
            return {
                ...state,
                errors: {
                    email: !validEmail.test(state.email) ? true : false,
                    firstName: !state.firstName ? true : false,
                    lastName: !state.lastName ? true : false,
                },
            };
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const init = {
    firstName: "",
    lastName: "",
    email: "",
    errors: {
        email: false,
        firstName: false,
        lastName: false,
    },
};

type ErrorState = {
    state: boolean;
    title: string;
    body: string;
};

const hasErrors = (
    state: State,
    setError: (error: ErrorState) => void,
    dispatch: (value: Action) => void
) => {
    dispatch({ type: "validate", value: "" });
    if (!state.firstName || !state.lastName) {
        setError({
            state: true,
            title: "Error submitting",
            body: "Please complete all required fields and try again.",
        });
        return true;
    }

    if (!state.email || !validEmail.test(state.email)) {
        setError({
            state: true,
            title: "Invalid email address",
            body: "Please double check the email you entered and try again.",
        });
        return true;
    }

    return false;
};

const Contact = (): JSX.Element => {
    const { slug } = useParams();

    const [state, dispatch] = useReducer(reducer, init);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<ErrorState>({
        state: false,
        title: "",
        body: "",
    });

    const data = {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: e.target.name as Action["type"],
            value: e.target.value,
        });

        if (error.state) {
            setError((prev) => ({ ...prev, state: false }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (hasErrors(state, setError, dispatch)) {
            return;
        }

        setIsSubmitting(true);
        try {
            const resp = await fetch("/.netlify/functions/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await resp.json();
            if (!resp.ok) {
                throw new Error(responseData.error || "Failed to submit form");
            }

            setIsSubmitting(false);
            setSubmitted(true);
        } catch (error: unknown) {
            console.error("Error:", error);
            setIsSubmitting(false);
            setError({
                state: true,
                title: "Submission Error",
                body:
                    error instanceof Error && error.message
                        ? error.message
                        : "There was a problem with the submission.",
            });
        }
    };

    if (slug === "contact")
        return (
            <Container maxWidth="md">
                <Stack
                    sx={{
                        mt: 2,
                    }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    {submitted && (
                        <DoneIcon
                            sx={{ fontSize: 100, color: "success.main" }}
                        />
                    )}
                </Stack>
                <Typography
                    gutterBottom
                    align="center"
                    variant="h4"
                    sx={{ mt: 6, mb: 2 }}>
                    {!submitted
                        ? "Sign up to my newsletter for exclusive monthly updates."
                        : "Thank you for signing up!"}
                </Typography>
                {!submitted && (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <InputField
                                name="firstName"
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                                error={error.state && state.errors.firstName}
                                fullWidth
                                label="First Name"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <InputField
                                name="lastName"
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                error={error.state && state.errors.lastName}
                                fullWidth
                                label="Last Name"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <InputField
                                name="email"
                                required
                                disabled={isSubmitting}
                                error={error.state && state.errors.email}
                                onChange={handleChange}
                                type="email"
                                fullWidth
                                label="Email Address"
                            />
                        </Grid>
                        <Grid size={12} sx={{ display: "flex" }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ width: { xs: "100%", md: "auto" } }}
                                loading={isSubmitting}
                                onClick={handleSubmit}>
                                Subscribe
                            </Button>
                        </Grid>
                        {error.state && (
                            <Grid size={12}>
                                <ErrorMessage
                                    title={error.title}
                                    body={error.body}
                                />
                            </Grid>
                        )}
                    </Grid>
                )}
            </Container>
        );
    return <></>;
};

export default Contact;
