import { JSX } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { unixFormatter } from "unix-date-formatter/unix";

const CommenterInfo = (props: { name: string; date: number }): JSX.Element => {
    const { name, date } = props;

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar />
            <Typography variant="subtitle1">{name}</Typography>
            <Typography sx={{ pt: 0.25 }}>{unixFormatter(date)}</Typography>
        </Stack>
    );
};
export default CommenterInfo;

export const CommentSkeleton = (): JSX.Element => {
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton variant="circular" width={45} height={45} />
                <Skeleton width={150} variant="text" />
                <Skeleton width={100} variant="text" />
            </Stack>
            <Container sx={{ mt: 2 }} maxWidth="md">
                <Skeleton width={"100%"} variant="text" />
                <Skeleton width={"75%"} variant="text" />
                <Skeleton width={"25%"} variant="text" />
            </Container>
        </Box>
    );
};
