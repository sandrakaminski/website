import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Embed } from 'hyvor-talk-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import type { ArticleType } from './ArticleType'
import DateFormatter from "@/components/DateFormatter";
import Trail from '@/components/Trail';
import { Markdown } from '@/shared';

export const Detail = (props: ArticleType) => {
    const { content } = props;
    const navigate = useNavigate();

    return (
        <>
            <Trail current={content.fields.title} />
            <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                <Typography sx={{ my: 2, maxWidth: "md" }} variant="h2" align="center" >
                    {content.fields.headline}
                </Typography>
                <Stack
                    sx={{ my: 2 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2} >
                    <Typography variant="body1"  >
                        <DateFormatter dateString={content.fields.date} />
                    </Typography>
                    <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`, { state: { data: 'about' } })} variant="body1">
                        {content.fields.author.fields.name}
                    </Link>
                </Stack>
                <Box sx={{ py: 4 }}>
                    {content.fields.coverImage ?
                        <CardMedia
                            loading="lazy"
                            component="img"
                            sx={{ width: '100%', height: 'auto' }}
                            src={content?.fields.coverImage.fields.file.url}
                            alt={content.fields.coverImage.fields.title}
                        />
                        : <Skeleton sx={{ width: '100%', height: 450 }} />
                    }
                </Box>
                <Box sx={{ maxWidth: 600 }}>
                    <ReactMarkdown components={Markdown}>{content.fields.body}</ReactMarkdown>
                    <Embed
                        websiteId={import.meta.env.VITE_HYVOR_WEBSITE}
                        id={content.fields.slug}
                    />
                </Box>
            </Stack>
        </>
    )
}
export default Detail;