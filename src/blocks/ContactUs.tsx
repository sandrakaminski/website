import React, { useState } from "react";

import MailchimpSubscribe from "react-mailchimp-subscribe"
import { LoadingButton as Button } from '@mui/lab';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const audienceId: string = import.meta.env.VITE_MAILCHIMP_LIST_ID
const mailApi: string = import.meta.env.VITE_MAILCHIMP_API_KEY
const url: string = `https://sandrakaminski.us20.list-manage.com/subscribe/post?u=${mailApi}&id=${audienceId}`;
const validEmail: RegExp = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

const CustomForm = ({ status, message, onValidated }: any) => {
    const [fields, setFields] = useState<any>({
        firstName: "",
        lastName: "",
        email: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    }

    const handleSubmit: Function = () => {
        fields.email &&
            fields.firstName &&
            fields.lastName &&
            onValidated({
                EMAIL: fields.email.value,
                FNAME: fields.firstName.value,
                LNAME: fields.lastName.value
            });
    }

    return (
        <>
            {status === "error" && (
                <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {!status &&
                <Grid container spacing={2}>
                    <Grid xs={6} >
                        <TextField
                            name={"firstName"}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            label="First Name"
                        />
                    </Grid>
                    <Grid xs={6} >
                        <TextField
                            name={"lastName"}
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
                        <Button disabled={status === "sending"} loading={status === "sending"} size="large" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            }
            {status === "success" && (
                <div
                    style={{ color: "green" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
        </>
    );
};

const ContactUs = () => {
    return (
        <Container maxWidth="sm">
            <Typography color="grayText" variant="subtitle1">Sign up to my newsletter for exclusive monthly updates from my life as a stylist.</Typography>
            <MailchimpSubscribe url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={(formData: any) => subscribe(formData)}
                    />
                )}
            />
        </Container>
    );
}
export default ContactUs;
