import { JSX } from "react";

import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { Entry } from "contentful";
import { useNavigate } from "react-router-dom";

import DefaultImage from "@/components/DefaultImage";
import type { ImageContainerProps, ContentEntryProps } from "@/types";

const ImageContainer = (
    props: ContentEntryProps<ImageContainerProps>
): JSX.Element => {
    const { contentEntry } = props;
    const navigate = useNavigate();

    return (
        <ImageList gap={8}>
            {contentEntry?.fields.blocks.map((img, index) => (
                <ImageListItem
                    key={index}
                    id="imageContainer"
                    rows={img.fields.imageRows}
                    component={CardActionArea}
                    onClick={() => navigate(img.fields.slug)}>
                    <FloatingText contentEntry={img} />
                    <DefaultImage
                        enableZoom
                        id="image"
                        src={img.fields.image.fields.file.url}
                        alt={`image ${index}`}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
export default ImageContainer;

type FloatingTextProps = {
    contentEntry: Entry<{
        title: string;
        subheader: string;
    }>;
};

const FloatingText = (props: FloatingTextProps): JSX.Element => {
    const { contentEntry } = props;

    return (
        <>
            {contentEntry && (
                <Box
                    sx={{
                        zIndex: 1,
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Typography
                        id="title"
                        variant="h2"
                        gutterBottom
                        sx={{ color: "background.paper" }}>
                        {contentEntry.fields.title}
                    </Typography>
                    <Typography
                        id="subheader"
                        variant="body1"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            color: "background.paper",
                        }}>
                        {contentEntry.fields.subheader}
                    </Typography>
                </Box>
            )}
        </>
    );
};
