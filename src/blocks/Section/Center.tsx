import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import { SectionMarkDown } from './SectionProps';
import type { Content, ResourceType } from './SectionTypes';

export const Center = (props: Content) => {
    const { content } = props;

    return (
        <Grid container direction="column" justifyContent="center" sx={{ p: { md: 4 } }}>
            <Grid item xs={12} sm={6} >
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: '100%', height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
                <Typography align="center" variant="h1" sx={{ p: 6 }}>
                    {content.fields.headline}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} >
                {content.fields.resources?.map((item: ResourceType, index: number) => (
                    <Box key={index} justifyContent="center" alignContent="center">
                        <Typography align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        <Resource resource={item} />
                    </Box>
                ))}
            </Grid>
            <Container maxWidth="sm" sx={{ justifyContent: "center", alignItems: "center" }}>
                <Box justifyContent="center" alignContent="center">
                    <ReactMarkdown components={SectionMarkDown} >
                        {content.fields.body}
                    </ReactMarkdown>
                </Box>
            </Container>
        </Grid >
    )
}

export default Center;