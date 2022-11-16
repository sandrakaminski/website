import React, { useState, useEffect } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from 'react-router-dom';


const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

const CustomForm = () => {
    const [email, setEmail] = useState(false);
    const [submitting, setSubmitting] = useState<any>(false)
    const [status, setStatus] = useState<any>('')
    const [fields, setFields] = useState<any>({
        first_name: '',
        last_name: '',
        email: ''
    })
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const validate = (name: any, value: any) => {
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
        const { name, value } = e.target;
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
            console.log(res)
            if (res.ok) {
                setSubmitting(false);
                setStatus("success");
                return res;
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
    }, [errors, email]);

    return (
        <>
            {status === "error" && (
                <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ p: 2 }} color="red" variant="h5" textAlign="center">Please use a valid email address</Typography>
                    <Button variant="outlined" onClick={() => setStatus("")}>Try Again</Button>
                </Stack>
            )}
            {!status &&
                <Grid container spacing={3}>
                    <Grid xs={6} >
                        <TextField
                            error={errors.first_name.length > 0}
                            name={"first_name"}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            label="First Name"
                            helperText={errors.first_name}
                        />
                    </Grid>
                    <Grid xs={6} >
                        <TextField
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
                        <LoadingButton disabled={!email} loading={submitting} onClick={handleSubmit}>
                            Submit
                        </LoadingButton>
                    </Grid>
                </Grid>
            }
            {status === "success" && (
                <Typography sx={{ color: 'success.main' }} variant="h5" textAlign="center">Thank you for signing up</Typography>
            )}
        </>
    );
};

const ContactUs: React.FC = () => {
    const { slug } = useParams();

    return (
        <>
            {slug === 'contact' &&
                <Container maxWidth="sm">
                    <Typography align="center" color="grayText" variant="h5" sx={{ p: 4 }}>
                        Sign up to my newsletter for exclusive monthly updates from my life as a stylist.
                    </Typography>
                    <CustomForm />
                </Container>
            }
        </>
    );
}
export default ContactUs;