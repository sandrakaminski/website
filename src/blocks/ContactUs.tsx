import React, { useState } from "react";

import { LoadingButton as Button } from '@mui/lab';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";

const audienceId: string = import.meta.env.VITE_MAILCHIMP_LIST_ID
const mailApi: string = import.meta.env.VITE_MAILCHIMP_API_KEY
const url: string = `https://sandrakaminski.us20.list-manage.com/subscribe/post?u=${audienceId}/members&id=${mailApi}`;

const ContactUs = () => {
    const [submitting, setSubmitting] = useState<Boolean | any>(false);
    const [fields, setFields] = useState<Object>({
        'FNAME': "",
        'LNAME': "",
        'EMAIl': ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    }

    const submitForm = async (e: Event) => {

        setSubmitting(true);
        try {
            await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `auth ${mailApi}`,
                    },
                    body: JSON.stringify(fields),

                }
            )

        }
        catch (error) {
            console.log("ERROR", error);
            setSubmitting(false);
        }
    }

    console.log(fields)

    return (
        <Container maxWidth="sm">
            <Grid component="form" spacing={2} container>
                <Grid xs={6}>
                    <TextField id="mce-FNAME" name="FNAME" onChange={handleChange} label="First Name" required fullWidth size={"small"} />
                </Grid>
                <Grid xs={6}>
                    <TextField id="mce-LNAME" name="LNAME" onChange={handleChange} label="Last Name" required fullWidth size={"small"} />
                </Grid>
                <Grid xs={12} >
                    <TextField id="mce-email_address" value={fields.MERGE0} name="MERGE0" onChange={handleChange} label="Email Address" required fullWidth size={"small"} />
                    <Button disabled={submitting} loading={submitting} onClick={submitForm}>Submit</Button>
                </Grid>
            </Grid>
        </Container>
    );
}
export default ContactUs;
