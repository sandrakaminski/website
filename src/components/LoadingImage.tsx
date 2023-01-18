import React, { useState, useEffect, memo } from "react";

import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import type { SystemStyleObject, Theme } from "@mui/system";

interface LoadingImageProps {
    src: string;
    alt: string;
    skeletonheight?: number | string;
    card?: string;
    sx?: SystemStyleObject<Theme>
}

export const LoadingImage = (props: LoadingImageProps) => {
    const { src, skeletonheight, card, sx } = props;
    const [load, setLoad] = useState<boolean>(true);

    let imageCard: Boolean
    if (card) {
        imageCard = true
    }
    else {
        imageCard = false
    }

    useEffect(() => {
        setLoad(true);
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
            setLoad(false);
        }
    }, [src]);

    const cardSize = { height: { xs: '100%', sm: '60vw', md: '36vw', xl: 600 }, width: '100%' };

    return (
        <>
            {load ?
                <Skeleton animation={false} sx={imageCard ? cardSize : { ...sx }} variant="rectangular" height={skeletonheight} />
                :
                <CardMedia sx={imageCard ? cardSize : { ...sx }} component="img" loading="lazy" {...props} />
            }
        </>
    )
}

export default LoadingImage;