import React from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";

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

export const CartSkeleton = () => {
    return (
        <Stack spacing={2}>
            <Skeleton variant="rounded" height="3rem" />
            <Grid sx={{ my: 0.5, px: 1 }} spacing={2} container direction="row" justifyContent="space-between" alignItems="center">
                <Grid xs={12} sm={6} container direction="row" >
                    <Skeleton sx={{ height: 55, width: 55 }} variant="rectangular" />
                    <Box sx={{ ml: 2 }}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} />
                        <Skeleton variant="text" width={100} />
                    </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                    <Stack direction="row" justifyContent={{ xs: 'space-between', sm: "flex-end" }} alignItems="center" spacing={4}>
                        <Skeleton width={60} variant="rounded" />
                        <Skeleton width={60} variant="rounded" />
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )
}