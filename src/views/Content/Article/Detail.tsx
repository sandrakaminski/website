import { JSX } from "react";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactGA from "react-ga4";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import gfm from "remark-gfm";
import { DateFormatter } from "unix-date-formatter/date";

import Comments from "./Comments";
import DefaultImage from "@/components/DefaultImage";
import Markdown from "@/components/Markdown";
import Trail from "@/components/Trail";
import type { ArticleType, ContentEntryProps } from "@/types";

const Detail = (props: ContentEntryProps<ArticleType>): JSX.Element => {
    const { contentEntry } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/about/${contentEntry.fields.author.fields.slug}`, {
            state: { data: "about" },
        });
        ReactGA.event({
            category: "About",
            action: `Read more about ${contentEntry.fields.headline}`,
            label: contentEntry.fields.headline,
        });
    };

    const dateFormatter = new DateFormatter(contentEntry?.fields.date);

    return (
        <>
            <Trail current={contentEntry?.fields.headline} />
            {contentEntry && (
                <Stack sx={{ my: 4 }} spacing={2} alignItems="center">
                    <Typography
                        id="headline"
                        sx={{ my: 2, maxWidth: "md" }}
                        variant="h1"
                        align="center">
                        {contentEntry.fields.headline}
                    </Typography>
                    <Stack
                        sx={{ my: 2 }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <Typography id="date" variant="body1">
                            {dateFormatter.formatDate()}
                        </Typography>
                        <FiberManualRecordIcon
                            sx={{ height: 2.5, width: 2.5 }}
                        />
                        <Link
                            id="author"
                            underline="hover"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleClick()}
                            variant="body1">
                            {contentEntry.fields.author.fields.name}
                        </Link>
                    </Stack>
                    <Box maxWidth={800}>
                        <DefaultImage
                            id="coverImage"
                            src={
                                contentEntry?.fields.coverImage.fields.file.url
                            }
                            alt={contentEntry.fields.coverImage.fields.title}
                        />
                    </Box>
                    <ReactMarkdown remarkPlugins={[gfm]} components={Markdown}>
                        {contentEntry.fields.body}
                    </ReactMarkdown>
                    <Comments contentEntry={contentEntry} />
                </Stack>
            )}
        </>
    );
};
export default Detail;
