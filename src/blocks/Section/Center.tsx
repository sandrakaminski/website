import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ReactMarkdown from 'react-markdown';
import Resource from './Resource';

type Content = {
    content: any;
}

export const Center = (props: Content) => {
    const { content } = props;
    const resources = content.fields.resources;
 
    return (
        <Grid container direction="column" justifyContent="center" sx={{ p: 8 }}>
            <Grid item xs={12} md={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
                <Typography align="center" variant="h1" sx={{ p: 6 }}>
                    {content.fields.headline}
                </Typography>
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
                <ReactMarkdown components={CenterMD} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Grid >
    )
}

export default Center;

export const CenterMD = {
    a: ({ ...props }: any) => <Button size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography variant="body1" textAlign="center" {...props} />,
};