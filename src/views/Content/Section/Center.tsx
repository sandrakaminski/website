import { JSX } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";

import Resource from "./Resource";
import DefaultImage from "@/components/DefaultImage";
import { SectionMarkDown } from "@/components/Markdown";
import type { Content, ContentEntryProps } from "@/types";

const Center = (props: ContentEntryProps<Content>): JSX.Element => {
    const { contentEntry } = props;

    return (
        <Stack alignItems="center" spacing={2}>
            {contentEntry?.fields.image?.fields.file.url && (
                <DefaultImage
                    id="sectionImg"
                    src={contentEntry.fields.image.fields.file.url}
                    alt={contentEntry.fields.image.fields.title}
                />
            )}
            {contentEntry?.fields.headline && (
                <Typography
                    id="sectionHeadline"
                    align="center"
                    variant="h3"
                    sx={{ pt: { xs: 2, md: 4 }, my: 2 }}>
                    {contentEntry.fields.headline}
                </Typography>
            )}
            {contentEntry?.fields.resources?.map((item, index) => (
                <Stack
                    key={index}
                    justifyContent="center"
                    alignContent="center"
                    sx={{ p: 2 }}>
                    <Typography align="center" variant="h3">
                        {item.fields.headline}
                    </Typography>
                    <Resource resource={item} />
                </Stack>
            ))}
            <ReactMarkdown components={SectionMarkDown}>
                {contentEntry?.fields.body}
            </ReactMarkdown>
            {contentEntry?.fields.ctaLabel && (
                <Button
                    id="sectionCta"
                    href={contentEntry.fields.ctaSlug}
                    size="large"
                    variant="contained"
                    sx={{ mt: 4, mb: 4 }}>
                    {contentEntry.fields.ctaLabel}
                </Button>
            )}
        </Stack>
    );
};

export default Center;
