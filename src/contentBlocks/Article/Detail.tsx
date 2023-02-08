import React from 'react';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import gfm from 'remark-gfm';

import Comments from './Comments';
import DateFormatter from "@/components/DateFormatter";
import LoadingImage from '@/components/LoadingImage';
import Markdown from '@/components/Markdown';
import Trail from '@/components/Trail';
import type { ArticleType, ContentProps } from '@/types';


const Detail = (props: ContentProps<ArticleType>) => {
    const { contentEntry } = props;
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/about/${contentEntry.fields.author.fields.slug}`, { state: { data: 'about' } })
        ReactGA.event({
            category: 'About',
            action: `Read more about ${contentEntry.fields.headline}`,
            label: contentEntry.fields.headline
        });
    }

    return (
        <>
            <Trail current={contentEntry?.fields.headline} />
            {contentEntry &&
                <>
                    <Stack sx={{ my: 4 }} spacing={2} alignItems="center">
                        <Typography sx={{ my: 2, maxWidth: "md" }} variant="h1" align="center" >
                            {contentEntry.fields.headline}
                        </Typography>
                        <Stack
                            sx={{ my: 2 }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2} >
                            <Typography variant="body1"  >
                                <DateFormatter dateString={contentEntry.fields.date} />
                            </Typography>
                            <FiberManualRecordIcon sx={{ height: 2.5, width: 2.5 }} />
                            <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => handleClick()} variant="body1">
                                {contentEntry.fields.author.fields.name}
                            </Link>
                        </Stack>
                        <Box maxWidth={800} >
                            <LoadingImage
                                skeletonheight={500}
                                sx={{ width: '100%', height: 'auto', py: 4 }}
                                src={contentEntry?.fields.coverImage.fields.file.url}
                                alt={contentEntry.fields.coverImage.fields.title}
                            />
                        </Box>
                        <ReactMarkdown remarkPlugins={[gfm]} components={Markdown}>{contentEntry.fields.body}</ReactMarkdown>
                        <Comments contentEntry={contentEntry} />
                    </Stack>
                </>
            }
        </>
    )
}
export default Detail;