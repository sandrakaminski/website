import React from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Asset } from 'contentful';

import type { ResourceType } from '@/types';

export type ResourceProps = {
    resource: ResourceType;
}

export const Resource = (props: ResourceProps) => {
    const { resource } = props;

    return (
        <Stack sx={{ pt: 2 }}>
            {resource?.fields.flexDirection === "Flex" ?
                <Grid container direction="row" justifyContent="center" spacing={0.5} sx={{ px: 4 }}>
                    {resource.fields.files?.map((file: Asset, index: number) => (
                        <Grid key={index} >
                            <Link id="resourceItem" sx={{ textUnderlineOffset: '6px' }} href={`${file.fields.file.url}`} target="_blank">
                                {file.fields.title}
                            </Link>
                            {resource.fields.files?.length - 1 !== index && ","}
                        </Grid>
                    ))}
                </Grid>
                :
                <Stack spacing={1}>
                    {resource?.fields.files?.map((file: Asset, index: number) =>
                        <Link id="resourceItem" key={index} href={`${file.fields.file.url}`} target="_blank" align="center" sx={{ textUnderlineOffset: '6px' }}>
                            {file.fields.title}
                        </Link>
                    )}
                </Stack>
            }
        </Stack>
    )
}
export default Resource;