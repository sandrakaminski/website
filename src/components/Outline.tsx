import React from "react";

import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

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