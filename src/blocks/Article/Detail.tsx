import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

import DateFormatter from "../../components/DateFormatter";
import Trail from '../../components/Trail';
import { ArticleMarkdown, Image } from '../../shared';


export const Detail = (props: any) => {
    const { content } = props;
    const location = useLocation();

    const name = location.state.data.slice(0, 1).toUpperCase() + location.state.data.slice(1);

    return (
        <>
            <Trail root={{ name: name, path: location.state.data }} current={{ name: content.fields.title }} />
            <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h3" component="h2" >
                    {content.fields.title}
                </Typography>
                <Typography variant="body1"  >
                    <DateFormatter dateString={content.fields.date} />
                </Typography>
                <Typography variant="body1" >
                    {content.fields.author.fields.name}
                </Typography>
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