import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import type { ArticleType } from './ArticleType'
import DateFormatter from "@/components/DateFormatter";
import Trail from '@/components/Trail';
import { ArticleMarkdown } from '@/shared';

export const Detail = (props: ArticleType) => {
    const { content } = props;
    const navigate = useNavigate();

    return (
        <>
            <Trail current={content.fields.title} />
            <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h2" align="center" >
                    {content.fields.headline}
                </Typography>
                <Stack direction="row"
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
                <Box sx={{ mt: 4 }}>
                    {content.fields.coverImage &&
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', height: 'auto' }}
                            src={content?.fields.coverImage.fields.file.url}
                            alt={content.fields.coverImage.fields.title}
                        />
                    }
                </Box>
                <Container maxWidth="sm">
                    <ReactMarkdown components={ArticleMarkdown}>{content.fields.body}</ReactMarkdown>
                </Container>
                {/* powr comments box */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <embed src="https://www.powr.io/plugins/comments/view?unique_label=24081f1e_1668047235&external_type=react" title="Comments" width="800" height="800" ></embed>
                </Box>
            </Stack>
        </>
    )
}
export default Detail;