import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Asset } from 'contentful';

import type { ResourceType } from '@/types';

type ResourceProps = {
    resource: ResourceType;
}

export const Resource = (props: ResourceProps) => {
    const { resource } = props;

    return (
        <>
            {resource?.fields.flexDirection === "Flex" ?
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ px: { xs: 4, md: 6 } }}>
                    {resource.fields.files?.map((file: Asset, index: number) => (
                        <Grid item key={index} >
                            <Link sx={{ justifyContent: "center", alignItems: "center", textUnderlineOffset: '6px' }} href={`${file.fields.file.url}`} align="center" target="_blank">
                                {file.fields.title}
                            </Link>
                            {resource.fields.files?.length - 1 !== index && ","}
                        </Grid>
                    ))}
                </Grid>
                :
                <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center">
                    {resource?.fields.files?.map((file: Asset, index: number) =>
                        <Box key={index}>
                            <Link href={`${file.fields.file.url}`} target="_blank" align="center" sx={{ textUnderlineOffset: '6px' }}>
                                {file.fields.title}
                            </Link>
                        </Box>
                    )}
                </Stack>
            }
        </>
    )
}
export default Resource;