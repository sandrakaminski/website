import { JSX } from "react";

import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import type { SystemStyleObject, Theme } from "@mui/system";

import { useImageSrc } from "@/hooks";

type LoadingImageProps = {
    src: string;
    alt: string;
    skeletonheight?: number | string;
    card?: string;
    sx?: SystemStyleObject<Theme>;
    width?: number | string;
    id?: string;
};

export const LoadingImage = (props: LoadingImageProps): JSX.Element => {
    const { src, skeletonheight, card, sx } = props;

    let imageCard: boolean;
    if (card) {
        imageCard = true;
    } else {
        imageCard = false;
    }

    const { load } = useImageSrc(src);

    const cardSize = {
        height: {
            xs: "100%",
            sm: "60vw",
            md: "36vw",
            xl: `calc(${700} - 50%)`,
        },
        width: "100%",
    };

    return (
        <>
            {load ? (
                <Skeleton
                    animation={false}
                    sx={imageCard ? cardSize : { ...sx }}
                    variant="rectangular"
                    {...props}
                    height={skeletonheight}
                />
            ) : (
                <CardMedia
                    sx={imageCard ? cardSize : { ...sx }}
                    component="img"
                    loading="lazy"
                    {...props}
                />
            )}
        </>
    );
};

export default LoadingImage;
