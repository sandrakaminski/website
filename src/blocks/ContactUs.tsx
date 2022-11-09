import React, { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import Alert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const url = `http://localhost:8080/person`

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
            try {
                const res = await fetch(
                    url,
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
                const j = await res;
                if (res.ok) {
                    setSubmitting(false);
                    setStatus("success");
                    return j;
                } else {
                    setStatus("error")
                    setSubmitting(false);
                }
            } catch (e) {
                return { error: e }
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
                <Grid container spacing={2}>
                    <Grid xs={6} >
                        <TextField
                            name={"first_name"}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            label="First Name"
                        />
                        {errors.first_name && <Alert severity="error">{errors.first_name}</Alert>}
                    </Grid>
                    <Grid xs={6} >
                        <TextField
                            name={"last_name"}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            label="Last Name"
                        />
                        {errors.last_name && <Alert severity="error">{errors.last_name}</Alert>}
                    </Grid>
                    <Grid xs={12} >
                        <TextField
                            name={"email"}
                            onChange={handleChange}
                            type="email"
                            fullWidth
                            label="Email Address"
                        />
                        {errors.email && <Alert severity="error">{errors.email}</Alert>}
                    </Grid>
                    <Grid xs={12} >
                        {submitting ?
                            <Button disabled startIcon={<CircularProgress size={20} />}>
                                Submit
                            </Button>
                            :
                            <>
                                {email ?
                                    <Button onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    :
                                    <Button disabled>
                                        Submit
                                    </Button>
                                }
                            </>
                        }
                    </Grid>
                </Grid>
            }
            {status === "success" && (
                <Box>
                    <Typography color="green" variant="h5" textAlign="center">Thankyou for signing up</Typography>
                </Box>
            )}
        </>
    );
};

const ContactUs = () => {
    return (
        <Container maxWidth="sm">
            <Typography color="grayText" variant="subtitle1" sx={{ p: 4 }}>
                Sign up to my newsletter for exclusive monthly updates from my life as a stylist.
            </Typography>
            <CustomForm />
        </Container>
    );
}
export default ContactUs;

export const UseValidate = (fields: any, validate: any) => {
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        for (let k = 0; k < Object.keys(fields).length; k++) {
            const name = Object.keys(fields)[k];
            const value = fields[name];
            if (validate(name, value) !== '') {
                setIsValid(false);
                return;
            }
        }
        setIsValid(true);
    }, [fields, validate]);

    return isValid;
};