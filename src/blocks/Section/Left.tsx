import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import { Markdown } from '../../shared';

type Content = {
    content: any
}

export const Left = (props: Content) => {
    const { content } = props;
    const resources = content.fields.resources;

    return (
        <Grid container direction="row" spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} md={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
            </Grid>
            <Grid item xs={12} md={6}>
                {resources?.map((item: any, index: number) => (
                    <Box key={index} justifyContent="center" alignContent="center">
                        <Typography align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        <Resource resource={item} />
                    </Box>
                ))}
            </Grid>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Grid >
    )
}
export default Left;