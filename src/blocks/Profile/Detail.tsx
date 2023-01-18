import React from 'react';

import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Asset } from "contentful";
import ReactMarkdown from 'react-markdown';

import LoadingImage from "@/components/LoadingImage";
import { Markdown } from '@/components/Markdown';
import Trail from '@/components/Trail';
import type { ProfileType, ContentProps } from '@/types';

const Detail = (props: ContentProps<ProfileType>) => {
    const { contentEntry } = props;

    return (
        <>
            <Trail current={contentEntry?.fields.title} />
            {contentEntry &&
                <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                    <Box sx={{ mt: 4 }}>
                        {contentEntry.fields.image &&
                            <CardMedia
                                loading="eager"
                                component="img"
                                sx={{ width: '100%', height: 'auto' }}
                                src={contentEntry?.fields.image.fields.file.url}
                                alt={contentEntry.fields.image.fields.title}
                            />
                        }
                        <Typography color="grayText" variant="caption" >
                            {contentEntry.fields.name}
                        </Typography>
                    </Box>
                    <Typography variant="h2">
                        {contentEntry.fields.title}
                    </Typography>
                    <Container maxWidth="sm">
                        <ReactMarkdown components={Markdown} >{contentEntry.fields.body}</ReactMarkdown>
                        <Stack sx={{ my: 4 }} direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="flex-start">
                            {contentEntry.fields.otherImages.map((image: Asset, index: number) =>
                                <Box key={index} >
                                    <LoadingImage
                                        sx={{ height: { sm: 300 } }}
                                        src={image.fields.file.url}
                                        alt={image.fields.title}
                                    />
                                    <Typography color="grayText" sx={{ mt: 2 }} variant="caption" >
                                        {image.fields.description}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                        <Divider />
                    </Container>
                </Stack>
            }
        </>
    )
}
export default Detail;