import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import Resource from './Resource';
import type { Content, ContentEntryProps, ResourceType } from '@/types';

export const Column = (props: ContentEntryProps<Content>) => {
    const { contentEntry } = props;

    return (
        <>
            {contentEntry &&
                <>
                    <Typography id="sectionHeadline" align="center" gutterBottom variant="h2">
                        {contentEntry.fields.headline}
                    </Typography>
                    <Grid container>
                        {contentEntry.fields.resources?.map((item: ResourceType, index: number) => (
                            <Grid key={index} xs={12} md={6} >
                                <Typography align="center" variant="h3" sx={{ pt: 4 }}>
                                    {item.fields.headline}
                                </Typography>
                                <Resource resource={item} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </>
    )
}

export default Column;
