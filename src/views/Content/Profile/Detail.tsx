import { JSX } from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Asset } from "contentful";
import ReactMarkdown from 'react-markdown';

import LoadingImage from "@/components/LoadingImage";
import { Markdown } from '@/components/Markdown';
// import Trail from '@/components/Trail';
import type { ProfileType, ContentEntryProps } from '@/types';

const Detail = (props: ContentEntryProps<ProfileType>): JSX.Element => {
    const { contentEntry } = props;

    return (
        <>
            {/* <Trail current={contentEntry?.fields.title} /> */}
            {contentEntry &&
                <Stack sx={{ my: 4 }} spacing={2} justifyContent="space-evenly" alignItems="center">
                    <Box sx={{ mt: 4 }}>
                        <LoadingImage
                            id="profileImage"
                            width={500}
                            skeletonheight={500}
                            sx={{ width: '100%', height: 'auto' }}
                            src={contentEntry?.fields.image.fields.file.url}
                            alt={contentEntry.fields.image.fields.title}
                        />
                    </Box>
                    <Typography id="title" variant="h3">
                        {contentEntry.fields.title}
                    </Typography>
                    <Container maxWidth="sm">
                        <ReactMarkdown components={Markdown} >{contentEntry.fields.body}</ReactMarkdown>
                        <Stack sx={{ my: 4 }} direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="flex-start">
                            {contentEntry.fields.otherImages.map((image: Asset, index: number) =>
                                <Box key={index} >
                                    <LoadingImage
                                        id="otherImages"
                                        sx={{ height: { sm: 300 } }}
                                        src={image.fields.file.url}
                                        alt={image.fields.title}
                                    />
                                    <Typography id="otherImgDescription" color="grayText" sx={{ mt: 2 }} variant="caption" >
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