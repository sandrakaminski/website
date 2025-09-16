import { JSX } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";

import Resource from "./Resource";
import DefaultImage from "@/components/DefaultImage";
import { SectionMarkDown } from "@/components/Markdown";
import type { Content, ContentEntryProps, ResourceType } from "@/types";

export const Left = (props: ContentEntryProps<Content>): JSX.Element => {
    const { contentEntry } = props;

    return (
        <>
            {contentEntry && (
                <Grid container direction="row" spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        {contentEntry.fields.image?.fields.file.url && (
                            <DefaultImage
                                id="sectionImg"
                                src={contentEntry.fields.image.fields.file.url}
                                alt={contentEntry.fields.image.fields.title}
                            />
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            id="sectionHeadline"
                            align="center"
                            variant="h2">
                            {contentEntry.fields.headline}
                        </Typography>
                        {contentEntry.fields.resources?.map(
                            (item: ResourceType, index: number) => (
                                <Box key={index}>
                                    {item.fields.headline && (
                                        <Typography
                                            align="center"
                                            variant="h3"
                                            sx={{
                                                pt: { xs: 4, sm: 6, md: 6 },
                                            }}>
                                            {item.fields.headline}
                                        </Typography>
                                    )}
                                    <Resource resource={item} />
                                </Box>
                            )
                        )}
                    </Grid>
                    <ReactMarkdown components={SectionMarkDown}>
                        {contentEntry.fields.body}
                    </ReactMarkdown>
                </Grid>
            )}
        </>
    );
};
export default Left;
