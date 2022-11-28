import React, { useState, useEffect } from "react";

import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from 'react-router-dom';

const validEmail: RegExp = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

type Fields = {
    first_name: string;
    last_name: string;
    email: string;
}

const ContactUs: React.FC = () => {
    const { slug } = useParams();
    const [email, setEmail] = useState(false);
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [status, setStatus] = useState<string>();
    const [fields, setFields] = useState<Fields>({
        first_name: '',
        last_name: '',
        email: ''
    })
    const [errors, setErrors] = useState<Fields>({
        first_name: '',
        last_name: '',
        email: '',
    });

    const validate = (name: string, value: any) => {
        if (name === 'first_name' && value.length === 0) {
            return '';
        }
        if (name === 'last_name' && value.length === 0) {
            return '';
        }
        if (name === 'email' && value.length === 0) {
            return '';
        }
        if ((name === 'first_name') && (value.trim().length < 2)) {
            return 'First name must be at least 2 characters'
        }
        if ((name === 'last_name') && (value.trim().length < 2)) {
            return 'Last name must be at least 2 characters'
        }
        if ((name === 'email') && (validEmail.test(value))) {
            setEmail(true);
        }
        if ((name === 'email') && (!validEmail.test(value))) {
            setEmail(false);
            return 'Please enter a valid email address'
        }
        return '';
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: HTMLInputElement = e.target;
        setFields({ ...fields, [name]: value });

        const err = validate(name, value);
        setErrors({ ...errors, [name]: err });
    }

    const handleSubmit = async () => {
        if (validEmail.test(fields.email)) {
            setSubmitting(true);
            const res = await fetch(`/.netlify/functions/registration`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(fields),
                }
            );
            setEmail(true);
            if (res.ok) {
                setSubmitting(false);
                setStatus("success");
            } else {
                setStatus("error")
                setSubmitting(false);
            }
        } else {
            return 'Please enter a valid email address'
        }
    }

    useEffect(() => {
        if (errors) {
            setSubmitting(false);
        }
        if (fields) {
            setStatus("")
            setSubmitting(false);
        }
    }, [errors, email, fields]);

    return (
        <>
            {slug === 'contact' &&
                <>
                    {status !== "success" &&
                        <Typography gutterBottom align="center" variant="h4" sx={{ mt: 6, mb: 2 }}>
                            Sign up to my newsletter for exclusive monthly updates from my life as a stylist.
                        </Typography>
                    }
                    <Container maxWidth="sm">
                        {status !== "success" &&
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6} >
                                    <TextField
                                        size="small"
                                        error={errors.first_name.length > 0}
                                        name={"first_name"}
                                        onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        label="First Name"
                                        helperText={errors.first_name}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} >
                                    <TextField
                                        size="small"
                                        error={errors.last_name.length > 0}
                                        name={"last_name"}
                                        onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        label="Last Name"
                                        helperText={errors.last_name}
                                    />
                                </Grid>
                                <Grid xs={12} >
                                    <TextField
                                        size="small"
                                        error={errors.email.length > 0}
                                        name={"email"}
                                        onChange={handleChange}
                                        type="email"
                                        fullWidth
                                        label="Email Address"
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid xs={12} >
                                    {status === "error" && (
                                        <Typography textAlign="center" color="red" variant="body1" >Error occured. Please try again.</Typography>
                                    )}
                                </Grid>
                                <Grid xs={12} >
                                    <LoadingButton disabled={!email} loading={submitting} onClick={handleSubmit}>
                                        Subscribe
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        }
                    {status === "success" && (
                        <Stack
                            sx={{ mt: 10 }}
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <DoneIcon sx={{ fontSize: 100, color: 'success.main' }} />
                            <Typography  variant="h2" textAlign="center">Thank you for subscribing</Typography>
                        </Stack>
                        )}
                    </Container>
                </>
            }
        </>
    );
};

export default ContactUs;