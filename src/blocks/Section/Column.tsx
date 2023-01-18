import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import Resource from './Resource';
import type { Content, ContentProps } from '@/types';

export const Column = (props: ContentProps<Content>) => {
    const { contentEntry } = props;

    return (
        <>
            {contentEntry &&
                <Box sx={{ p: 5 }}>
                    <Typography align="center" gutterBottom variant="h2">
                        {contentEntry.fields.headline}
                    </Typography>
                    <Grid container>
                        {contentEntry.fields.resources.map((item: any, index: number) => (
                            <Grid key={index} xs={12} md={6} >
                                <Typography align="center" variant="h3" sx={{ p: 4 }}>
                                    {item.fields.headline}
                                </Typography>
                                <Box sx={{ pt: 4 }}>
                                    <Resource resource={item} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
        </>
    )
}

export default Column;
