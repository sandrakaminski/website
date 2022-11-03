import React from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

import ReactMarkdown from 'react-markdown';
import { Markdown } from '../../shared';


export const Section = (props: Content) => {
    const { content } = props;

    switch (content.fields.sectionType) {
        case "Right":
            return <Right content={content} />
        case "Left":
            return <Left content={content} />
        case "Center":
            return <Center content={content} />
        default:
            return <Center content={content} />
    }
}
export default Section;

type Content = {
    content: any
}

const Center = (props: Content) => {
    const { content } = props;
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
            {content.fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: content.fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
                    component="img"
                    src={content.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title}
                />
            }
            <Typography variant="h1" component="h1" sx={{ p: 6 }}>
                {content.fields.headline}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Stack>
    )
}

const Left = (props: Content) => {
    const { content } = props;
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
            {content.fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: content.fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
                    component="img"
                    src={content.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title}
                />
            }
            <Typography variant="h1" component="h1" sx={{ p: 6 }}>
                {content.fields.headline}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Stack>
    )
}

const Right = (props: Content) => {
    const { content } = props;

    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
            {content.fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: content.fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
                    component="img"
                    src={content.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title}
                />
            }
            <Typography variant="h1" component="h1" sx={{ p: 6 }}>
                {content.fields.headline}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Stack>
    )
}