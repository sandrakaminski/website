import React, { useState, useEffect, memo } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";

interface LoadingStateProps {
    content: {
        fields: {
            type: string;
            references: any[];
            layout: string;
        }
    }
    children: React.ReactNode;
    type: string;
}

const LoadingState = (props: LoadingStateProps) => {
    const { content, children, type } = props;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!content) {
            setLoading(true)
        }
        else if (content) {
            setLoading(false)
        }

    }, [content, setLoading])

    switch (type) {
        case "Header": return loading ? <Skeleton sx={{ mx: 2 }} height={100} /> : content && <>{children}</>
        case "Grid": return loading ? <GridOutline /> : content && <>{children}</>
        case "Default": return loading ? <Outline /> : content && <>{children}</>
        default: return loading ? <Outline /> : content && <>{children}</>
    }
}
export default LoadingState;

const GridOutline: React.FC = () => {
    return (
        <Card>
            <Stack spacing={2}>
                <Skeleton variant="rounded" height="25rem" />
                <Box sx={{ p: 1 }}>
                    <Skeleton sx={{ my: 1 }} variant="rounded" height="3rem" />
                    <Skeleton variant="text" height="2rem" />
                </Box>
            </Stack>
        </Card>
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

interface LoadingImageProps {
    src: string;
    alt: string;
    skeletonheight?: number | string;
    card?: boolean
    style?: React.CSSProperties;
}

export const LoadingImage = memo((props: LoadingImageProps) => {
    const { src, skeletonheight, card, style } = props;
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        setLoad(true)
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
            setLoad(false);
        }
    }, [src])

    const cardSize = { height: { xs: '100%', sm: '60vw', md: '36vw', xl: 600 }, width: '100%' }

    return (
        <>
            {load === true ?
                <Skeleton animation={false} sx={card ? cardSize : null} variant="rectangular" height={skeletonheight}  {...props} />
                :
                <CardMedia sx={card ? cardSize : { ...style }} component="img" loading="lazy" {...props} />
            }
        </>
    )
});