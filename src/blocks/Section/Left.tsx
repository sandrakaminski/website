import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import { SectionMarkDown } from './SectionProps';
import type { Content, ResourceType } from './SectionTypes';

export const Left = (props: Content) => {
    const { content } = props;

    return (
        <Grid container direction="row" spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={6} md={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                {content.fields.resources?.map((item: ResourceType, index: number) => (
                    <Box key={index} justifyContent="center" alignContent="center">
                        <Typography align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        <Resource resource={item} />
                    </Box>
                ))}
            </Grid>
            <Container maxWidth="sm">
                <ReactMarkdown components={SectionMarkDown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Grid >
    )
}
export default Left;