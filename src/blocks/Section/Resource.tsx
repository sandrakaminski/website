import Box from '@mui/material/Box';
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
                <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {resource.fields.files?.map((file: Image, index: number) => (
                        <Box key={index}>
                            <Link sx={{ justifyContent: "center", alignItems: "center" }} href={`${file.fields.file.url}`} align="center" target="_blank" >
                                {file.fields.title}
                            </Link>
                            {resource.fields.files?.length - 1 !== index &&
                                <>
                                    {","}
                                </>
                            }
                        </Box>
                    ))}
                </Stack>
                :
                <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center">
                    {resource.fields.files?.map((file: Image, index: number) =>
                        <Box key={index}>
                            <Link href={`${file.fields.file.url}`} target="_blank">
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