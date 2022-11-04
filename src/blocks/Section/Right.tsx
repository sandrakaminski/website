import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 10 }}>

            <Grid item xs={12} md={4} lg={6}>
                {resources.map((item: any, index: number) => (
                    <Box key={index}>
                        <Typography align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        <Typography align="center" variant="body1" component="h1">
                            <Link href={`${item.fields.files[0].fields.file.url}`}>
                                {item.fields["files"][0].fields.title}
                            </Link>
                        </Typography>
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