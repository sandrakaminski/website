import React, { useState, useEffect, JSX } from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";

type LoadingStateProps = {
    contentEntry: object;
    children: React.ReactNode;
    type: string;
};

const LoadingState = (props: LoadingStateProps): JSX.Element => {
    const { contentEntry, children, type } = props;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (contentEntry) {
            setLoading(false);
        }
    }, [contentEntry, setLoading]);

    switch (type) {
        case "Header":
            return loading ? (
                <Skeleton sx={{ mx: 2 }} height={100} />
            ) : (
                contentEntry && <>{children}</>
            );
        case "Grid":
            return loading ? <GridOutline /> : contentEntry && <>{children}</>;
        case "Default":
            return loading ? <Outline /> : contentEntry && <>{children}</>;
        case "Detailed":
            return loading ? <Outline /> : contentEntry && <>{children}</>;
        default:
            throw new Error("Invalid type");
    }
};
export default LoadingState;

const GridOutline = (): JSX.Element => {
    return (
        <Box>
            <Stack spacing={2}>
                <Skeleton variant="rectangular" height={500} />
                <Box sx={{ pb: 1, px: 1 }}>
                    <Skeleton
                        sx={{ mb: 3 }}
                        variant="rounded"
                        height="2.5rem"
                    />
                    <Skeleton variant="text" height="2rem" />
                </Box>
            </Stack>
        </Box>
    );
};

export const Outline = (): JSX.Element => {
    return (
        <>
            <Stack justifyContent="center" alignItems="center" sx={{ pt: 10 }}>
                <Skeleton variant="text" width={"60%"} height="5rem" />
                <Skeleton variant="text" width={"40%"} height="5rem" />
                <Skeleton
                    variant="text"
                    width={"20%"}
                    height="2rem"
                    sx={{ m: 5 }}
                />
            </Stack>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={6}
                sx={{ pt: 3 }}>
                <Skeleton variant="rounded" width={"50%"} height={"50rem"} />
                <Skeleton variant="rounded" width={"50%"} height={"30rem"} />
            </Stack>
        </>
    );
};

export const CartSkeleton = (): JSX.Element => {
    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height="2.5rem"
                    sx={{ mb: 4 }}
                />
            </Stack>
            <Stack sx={{ mt: 4 }}>
                <Grid
                    sx={{ my: 0.5, px: 1 }}
                    spacing={2}
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid xs={12} sm={6} container direction="row">
                        <Skeleton
                            sx={{ height: 55, width: 55 }}
                            variant="rectangular"
                        />
                        <Box sx={{ ml: 2 }}>
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                                width={200}
                            />
                            <Skeleton variant="text" width={100} />
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Stack
                            direction="row"
                            justifyContent={{
                                xs: "space-between",
                                sm: "flex-end",
                            }}
                            alignItems="center"
                            spacing={4}>
                            <Skeleton
                                width={100}
                                height={40}
                                variant="rounded"
                            />
                            <Skeleton
                                width={100}
                                height={40}
                                variant="rounded"
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};
