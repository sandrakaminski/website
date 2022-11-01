import React from "react";

import Skeleton from "@mui/material/Skeleton";

const Outline: React.FC = () => {
    return (
        <>
            <Skeleton variant="rounded" height="5rem" />
            <Skeleton variant="rounded" height="20rem" />
            <Skeleton variant="rounded" height="5rem" />
        </>
    )

}
export default Outline;