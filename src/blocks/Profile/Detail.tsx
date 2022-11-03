import React from 'react';

import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import { Markdown } from '../../shared';

const Detail = (props: ContentProps) => {
    const { content } = props;
    console.log("Test", content)

    return (
        <Stack>
            {content.fields.image &&
                <>
                    <CardMedia
                        component="img"
                        sx={{ width: '50%', height: 'auto' }}
                        src={content?.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                    <Typography variant="h2" component="caption" sx={{ p: 6 }}>
                        {content.fields.name}
                    </Typography>
                </>
            }
            <Typography variant="h2" component="h2" sx={{ p: 6 }}>
                {content.fields.title}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >{content.fields.body}</ReactMarkdown>
            </Container>
        </Stack>
    )
}
export default Detail;

interface ContentProps {
    content: {
        fields: {
            title: string;
            name: string;
            headline: string;
            body: string;
            image: {
                fields: {
                    file: {
                        url: string;
                    }
                    title: string;
                }
            }
        }
    }
}