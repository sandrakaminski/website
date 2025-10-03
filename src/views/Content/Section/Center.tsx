import { JSX } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";

import Resource from "./Resource";
import { SectionMarkDown } from "@/components/Markdown";
import { useImageSrc } from "@/hooks";
import type { Content, ContentEntryProps } from "@/types";

const Center = (props: ContentEntryProps<Content>): JSX.Element => {
    const { contentEntry } = props;

    const src = contentEntry?.fields.image?.fields.file.url;
    const { load } = useImageSrc(src);

    return (
        <Stack alignItems="center" spacing={2}>
            {src && (
                <Box
                    data-testid="sectionImg"
                    id="sectionImg"
                    sx={{
                        background: load ? "#000" : `url(${src})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: { xs: 200, md: 500 },
                        width: "100%",
                    }}
                />
            )}
            {contentEntry?.fields.headline && (
                <Typography
                    data-testid="sectionHeadline"
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
                    data-testid="sectionCta"
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
