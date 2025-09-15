import React, { JSX } from "react";

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";

import { useImageSrc } from "@/functions/useImgSrc";

interface DefaultImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    enableZoom?: boolean;
    isCard?: boolean;
}

const DefaultImage = (props: DefaultImageProps): JSX.Element => {
    const { isCard, height, enableZoom, src, ...rest } = props;

    const img = src ?? "";
    const { load } = useImageSrc(img);
    const resolvedHeight = height ?? "100%";

    const cardSize = {
        xs: "100%",
        sm: "60vw",
        md: "36vw",
        xl: `calc(${700} - 50%)`,
    };

    return (
        <Box sx={{ width: "100%", height: resolvedHeight, display: "flex" }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                }}>
                {load ? (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        sx={{
                            height: isCard ? cardSize : resolvedHeight,
                        }}
                    />
                ) : (
                    <CardMedia
                        src={img}
                        component="img"
                        alt={rest.alt ?? ""}
                        sx={{
                            objectFit: isCard ? "cover" : "contain",
                            width: "100%",
                            height: isCard ? cardSize : resolvedHeight,
                            "&:hover": enableZoom
                                ? {
                                      transform: "scale(1.1)",
                                      transition: "transform 0.5s ease",
                                  }
                                : {},
                        }}
                        {...rest}
                    />
                )}
            </Box>
        </Box>
    );
};
export default DefaultImage;
