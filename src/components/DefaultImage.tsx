import React, { JSX } from "react";

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { ResponsiveStyleValue } from "@mui/system";

import { useImageSrc } from "@/hooks";

interface DefaultImageProps
    extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "height"> {
    enableZoom?: boolean;
    isCard?: boolean;
    height?: string | number | ResponsiveStyleValue<string | number>;
    objectfit?: ResponsiveStyleValue<
        "contain" | "cover" | "fill" | "none" | "scale-down"
    >;
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

    const autoSkeletonHeight = !isCard && resolvedHeight === "100%" ? 500 : "";

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
                        height={autoSkeletonHeight}
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
                        sx={{
                            objectFit: isCard ? "cover" : rest.objectfit,
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
