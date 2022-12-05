import { useState, useEffect, memo } from "react";

import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import type { SystemStyleObject, Theme } from "@mui/system";

interface LoadingImageProps {
    src: string;
    alt: string;
    skeletonheight?: number | string;
    card?: boolean
    sx?: SystemStyleObject<Theme>
}

export const LoadingImage = memo((props: LoadingImageProps) => {
    const { src, skeletonheight, card, sx } = props;
    const [load, setLoad] = useState<boolean>(true);

    if (card === null) {
        skeletonheight
    } else {
        skeletonheight === null
    }

    useEffect(() => {
        setLoad(true)
        const imageToLoad = new Image();
        imageToLoad.src = src || "";
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
                <CardMedia sx={card ? cardSize : { ...sx }} component="img" loading="lazy" {...props} />
            }
        </>
    )
});

export default LoadingImage;