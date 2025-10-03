import { JSX } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";

import DefaultImage from "@/components/DefaultImage";
import { Markdown } from "@/components/Markdown";
// import Trail from '@/components/Trail';
import type { ProfileType, ContentEntryProps } from "@/types";

const Detail = (props: ContentEntryProps<ProfileType>): JSX.Element => {
    const { contentEntry } = props;

    return (
        <>
            {/* <Trail current={contentEntry?.fields.title} /> */}
            {contentEntry && (
                <Stack
                    sx={{ my: 4 }}
                    spacing={2}
                    justifyContent="space-evenly"
                    alignItems="center">
                    <Box sx={{ mt: 4 }}>
                        <DefaultImage
                            data-testid="profileImage"
                            id="profileImage"
                            width={500}
                            src={contentEntry?.fields.image.fields.file.url}
                            alt={contentEntry.fields.image.fields.title}
                        />
                    </Box>
                    <Typography id="title" data-testid="title" variant="h3">
                        {contentEntry.fields.title}
                    </Typography>
                    <Container maxWidth="sm">
                        <ReactMarkdown components={Markdown}>
                            {contentEntry.fields.body}
                        </ReactMarkdown>
                        <Stack
                            sx={{ my: 4 }}
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            alignItems="flex-start">
                            {contentEntry.fields.otherImages.map(
                                (image, index) => (
                                    <Box key={index}>
                                        <DefaultImage
                                            data-testid="otherImages"
                                            id="otherImages"
                                            src={image.fields.file.url}
                                            alt={image.fields.title}
                                        />
                                        <Typography
                                            id="otherImgDescription"
                                            data-testid="otherImgDescription"
                                            color="grayText"
                                            sx={{ mt: 2 }}
                                            variant="caption">
                                            {image.fields.description}
                                        </Typography>
                                    </Box>
                                )
                            )}
                        </Stack>
                        <Divider />
                    </Container>
                </Stack>
            )}
        </>
    );
};
export default Detail;
