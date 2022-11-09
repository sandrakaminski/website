import React, { useState } from "react";

import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const url = `http://localhost:8080/person`

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

const CustomForm = () => {
    const [submitting, setSubmitting] = useState<any>(false)
    const [status, setStatus] = useState<any>('')
    const [fields, setFields] = useState<any>({
        first_name: "",
        last_name: "",
        email: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
        
    }

    const handleSubmit = async () => {
        validEmail.test(fields.email) ? setSubmitting(true) : setStatus('error');
        if (validEmail.test(fields.email)) {
            try {
                setSubmitting(true);
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
                const j = await res;
                if (res.ok) {
                    setSubmitting(false);
                    setStatus("success")
                    // return j;
                } else {
                    setStatus("error")
                    setSubmitting(false);
                    return j;
                }

            } catch (e) {
                return { error: e }
            }
        }
    }

    return (
        <>
            {status === "error" && (
                 <Box >
                    <Typography color="red" variant="h5" textAlign="center">Please use a valid email address</Typography>
                    <Button onClick={() => setStatus("")}>Try Again</Button>
                </Box>
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
                    </Grid>
                    <Grid xs={6} >
                        <TextField
                            name={"last_name"}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            label="Last Name"
                        />
                    </Grid>
                    <Grid xs={12} >
                        <TextField
                            name={"email"}
                            onChange={handleChange}
                            type="email"
                            fullWidth
                            label="Email Address"
                        />
                    </Grid>
                    <Grid xs={12} >
                        {submitting ? (
                            <LoadingButton
                                loading
                                size="large"
                                sx={{ size: 'large', width: "100%" }}
                            >
                            </LoadingButton>
                        ) : (
                            <Button
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}
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


