import React from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Outline: React.FC = () => {
    return (
        <Stack spacing={2}>
            <Skeleton variant="rounded" height="5rem" />
            <Skeleton variant="rounded" height="20rem" />
            <Skeleton variant="rounded" height="5rem" />
        </Stack>
    )
}
export default Outline;