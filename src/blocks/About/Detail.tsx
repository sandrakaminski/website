import React from 'react';

import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import { Markdown } from '../../shared';

const Detail = (props: ContentProps) => {
    const { content } = props;

    return (
        <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
            <Stack sx={{ mt: 4 }} spacing={1} alignItems="flex-start">
                {content.fields.image &&
                    <CardMedia
                        component="img"
                        sx={{ width: '100%', height: 'auto' }}
                        src={content?.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
                <Typography variant="caption" >
                    {content.fields.name}
                </Typography>
            </Stack>
            <Typography variant="h2" component="h2" >
                {content.fields.title}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >{content.fields.body}</ReactMarkdown>
                <Stack sx={{ mt: 2 }} direction="row" spacing={2} alignItems="flex-start">
                    {content.fields.otherImages.map((image: any, index: number) =>
                        <CardMedia
                            key={index}
                            component="img"
                            sx={{ width: '50%', height: 'auto' }}
                            src={image.fields.file.url}
                            alt={image.fields.file.title}
                        />
                    )}
                </Stack>
            </Container>
        </Stack>
    )
}
export default Detail;

type ContentProps = {
    content: {
        fields: {
            title: string;
            name: string;
            headline: string;
            body: string;
            otherImages: Image[];
            image: Image
        }
    }
}

type Image = {
    fields: {
        file: {
            url: string;
        }
        title: string;
    }
}