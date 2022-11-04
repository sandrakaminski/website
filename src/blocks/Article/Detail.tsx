import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

import DateFormatter from "../../components/DateFormatter";
import Trail from '../../components/Trail';
import { ArticleMarkdown, Image } from '../../shared';


export const Detail = (props: any) => {
    const { content } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const name = location.state.data.slice(0, 1).toUpperCase() + location.state.data.slice(1);

    return (
        <>
            <Trail root={{ name: name, path: location.state.data }} current={{ name: content.fields.title }} />
            <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h2"  >
                    {content.fields.title}
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
                    <ReactMarkdown components={ArticleMarkdown} >{content.fields.body}</ReactMarkdown>
                </Container>
                <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">

                </Stack>
            </Stack>
        </>
    )
}
export default Detail;