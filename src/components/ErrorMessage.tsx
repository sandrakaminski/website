import { JSX } from "react";

import Box from "@mui/material/Box";
import Tyography from "@mui/material/Typography";

const ErrorMessage = (props: { [x: string]: string }): JSX.Element => {
    const { title, body } = props;

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                aligItems: "flex-start",
                p: "21px 26px",
                gap: "10px",
                color: "primary.light",
                background: (theme) => theme.palette.error.main,
            }}>
            <Tyography color="error.contrastText" fontWeight="bold">
                {title}
            </Tyography>
            <Tyography color="error.contrastText">{body}</Tyography>
        </Box>
    );
};

export default ErrorMessage;
