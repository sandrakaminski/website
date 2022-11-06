import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import type { Image } from '../../shared';

interface ResourceProps {
    resource: {
        fields: {
            flexDirection: string;
            headline: string;
            description: string;
            link: string;
            files: Image[];
        }
    };
}

export const Resource = (props: ResourceProps) => {
    const { resource } = props;

    return (
        <>
            {resource.fields.flexDirection === "Flex" ?
                <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {resource.fields.files?.map((file: any, index: number) => (
                        <Box key={index}>
                            <Link sx={{ justifyContent: "center", alignItems: "center" }} href={`${file.fields.file.url}`} align="center" target="_blank" >
                                {file.fields.title},
                            </Link>

                        </Box>
                    ))}
                </Stack>
                :
                <Stack>
                    {resource.fields.files?.map((file: any, index: number) =>
                        <Box key={index}>
                            <Typography key={index} align="center" variant="body1" component="h1">
                                <Link href={`${file.fields.file.url}`} target="_blank">
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