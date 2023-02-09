import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import LoadingImage from '@/components/LoadingImage';
import { SectionMarkDown } from '@/components/Markdown';
import type { Content, ContentEntryProps, ResourceType } from '@/types';

export const Right = (props: ContentEntryProps<Content>) => {
    const { contentEntry } = props;

    return (
        <>
            {contentEntry &&
                <Grid container direction="row-reverse" spacing={2} sx={{ py: 6 }}>
                    <Grid item xs={12} sm={6} md={6}>
                        {contentEntry.fields.image?.fields.file.url &&
                            <LoadingImage
                                sx={{ width: "100%", height: 'auto' }}
                                skeletonheight={500}
                                src={contentEntry.fields.image.fields.file.url}
                                alt={contentEntry.fields.image.fields.title}
                            />
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Typography align="center" variant="h2" >
                            {contentEntry.fields.headline}
                        </Typography>
                        {contentEntry.fields.resources?.map((item: ResourceType, index: number) => (
                            <Box key={index} sx={{ justifyContent: "center", alignContent: "center" }}>
                                {item.fields.headline &&
                                    <Typography align="center" variant="h3" sx={{ pt: { xs: 4, sm: 6, md: 6 } }}>
                                        {item.fields.headline}
                                    </Typography>
                                }
                                <Box sx={{ pt: 4 }}>
                                    <Resource resource={item} />
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                    <Container maxWidth="sm">
                        <ReactMarkdown components={SectionMarkDown} >
                            {contentEntry.fields.body}
                        </ReactMarkdown>
                    </Container>
                </Grid >
            }
        </>
    )
}
export default Right;