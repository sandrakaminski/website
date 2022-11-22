import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import type { ResourceType } from './SectionTypes';
import type { Image } from '@/shared';

interface ResourceProps {
    resource: ResourceType;
}

export const Resource = (props: ResourceProps) => {
    const { resource } = props;

    return (
        <>
            {resource.fields.flexDirection === "Flex" ?
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
                    {resource.fields.files?.map((file: Image, index: number) => (
                        <Grid item key={index}>
                            <Typography >
                                <Link sx={{ justifyContent: "center", alignItems: "center" }} href={`${file.fields.file.url}`} align="center" target="_blank" underline='none'>
                                    {file.fields.title}
                                </Link>
                                {resource.fields.files?.length - 1 !== index &&
                                    <>
                                        {","}
                                    </>
                                }
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                :
                <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center">
                    {resource.fields.files?.map((file: Image, index: number) =>
                        <Box key={index}>
                            <Typography >
                                <Link href={`${file.fields.file.url}`} target="_blank" align="center" underline="none">
                                    {file.fields.title}
                                </Link>
                            </Typography>
                        </Box>
                    )}
                </Stack>
            }
        </>
    )
}
export default Resource;