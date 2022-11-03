import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

import ReactMarkdown from 'react-markdown';
import { Markdown } from '../../shared';

type Content = {
    content: any
}

export const Right = (props: Content) => {
    const { content } = props;

    return (
        <Stack direction="row-reverse" alignItems="center" justifyContent="center" spacing={2} sx={{ p: 10 }}>
            {content.fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: content?.fields?.bannerStyle === false ? "60%" : "50%", height: 'auto'}}
                    component="img"
                    src={content.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title}
                />
            }
            <Typography align="center" variant="h1" component="h1" sx={{ p: 6 }}>
                {content.fields?.image.fields?.title}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Stack>
    )
}
export default Right;