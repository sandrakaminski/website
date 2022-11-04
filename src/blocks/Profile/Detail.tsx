import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Trail from '../../components/Trail';
import { Markdown } from '../../shared';
import type { ProfileType } from './ProfileType';

const Detail = (props: ProfileType) => {
    const { content } = props;

    return (
        <>
            <Trail root={{ name: 'About', path: 'about' }} current={{ name: content.fields.name }} />
            <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                <Box sx={{ mt: 4 }}>
                    {content.fields.image &&
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', height: 'auto' }}
                            src={content?.fields.image.fields.file.url}
                            alt={content.fields.image.fields.title}
                        />
                    }
                    <Typography color="grayText" variant="caption" >
                        {content.fields.name}
                    </Typography>
                </Box>
                <Typography variant="h2" component="h2" >
                    {content.fields.title}
                </Typography>
                <Container maxWidth="sm">
                    <ReactMarkdown components={Markdown} >{content.fields.body}</ReactMarkdown>
                    <Stack sx={{ my: 4 }} direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="flex-start">
                        {content.fields.otherImages.map((image: any, index: number) =>
                            <Box key={index} >
                                <CardMedia
                                    component="img"
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
        </>
    )
}
export default Detail;