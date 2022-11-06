import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import ReactMarkdown from 'react-markdown';
import { Markdown } from '../../shared';

type Content = {
    content: any
}

export const Right = (props: Content) => {
    const { content } = props;
    const resources = content.fields.resources;

    return (
        <Grid container direction="row" spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} md={4} lg={6}>
                {resources.map((item: any, index: number) => (
                    <Box key={index} >
                        <Typography align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        {item.fields.files.map((file: any, index: number) => (
                            <Box key={index}>
                                {item.fields.flexDirection === "Flex" ?
                                    <Stack flexDirection="column">
                                        <Link href={`${file.fields.file.url}`} align="center" target="_blank" >
                                            {file.fields.title},
                                        </Link>
                                    </Stack>
                                    :
                                    <Typography key={index} align="center" variant="body1" component="h1">
                                        <Link href={`${file.fields.file.url}`} target="_blank">
                                            {file.fields.title}
                                        </Link>
                                    </Typography>
                                }
                            </Box>

                        ))}
                    </Box>
                ))}
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
            </Grid>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Grid >
    )
}
export default Right;