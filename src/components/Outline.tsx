import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";

const LoadingState = (props: any) => {
    const { content, children, type } = props;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!content) {
            setLoading(true)
        }
        else {
            setLoading(false)
        }
    }, [content])
    switch (type) {
        case "Grid": return (
            <>
                {loading ? <GridOutline /> : content && children}
            </>
        )
        case "Stack": return (
            <>
                {loading ? <Outline /> : content && children}
            </>
        )
        default: return (
            <>
                {loading ? <Outline /> : content && children}
            </>
        )
    }

}
export default LoadingState;

const GridOutline: React.FC = () => {
    return (
        <Stack spacing={2}>
            <Skeleton variant="rounded" height="25rem" />
            <Skeleton variant="rounded" height="5rem" />
        </Stack>
    )
}

const Outline: React.FC = () => {
    return (
        <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton variant="rounded" width={"50%"} height="5rem" />
            <Skeleton variant="rounded" width={"100%"} height="5rem" />
            <Skeleton variant="rounded" width={"100%"} height="5rem" />
        </Stack>
    )
}

export const CartSkeleton: React.FC = () => {
    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton variant="rounded" width="100%" height="2.5rem" sx={{ mb: 4 }} />
            </Stack>
            <Stack sx={{ mt: 4 }} >
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
                            <Skeleton width={100} height={40} variant="rounded" />
                            <Skeleton width={100} height={40} variant="rounded" />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    )
}
