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
        <>
            {content &&
                <Stack>
                    {content?.fields?.references[0].fields.image &&
                        <>
                            <CardMedia
                                component="img"
                                sx={{ width: '50%', height: 'auto' }}
                                src={content?.fields?.references[0].fields.image.fields.file.url}
                                alt={content?.fields?.references[0].fields.image.fields.title}
                            />
                            <Typography variant="h2" component="caption" sx={{ p: 6 }}>
                                {content.fields.references[0].fields.name}
                            </Typography>
                        </>
                    }
                    <Typography variant="h2" component="h2" sx={{ p: 6 }}>
                        {content.fields.references[0].fields.title}
                    </Typography>
                    <Container maxWidth="sm">
                        <ReactMarkdown components={Markdown} >{content.fields?.references[0].fields.body}</ReactMarkdown>
                    </Container>

                </Stack>
            }
        </>
    )
}
export default Detail;

interface ContentProps {
    content: {
        fields: {
            references: {
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
            }[]
        }
    }
}