import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';

import { useRoutes, useParams } from 'react-router-dom';

import Renderer from './blocks/Renderer';
import NotFound from './blocks/NotFound';
import Outline from './components/Outline';
import { useView } from "./client";

const Routes: React.FC = () => {
    const routes = [
        { path: '/', element: <Component /> },
        { path: '/:slug', element: <Component /> },
        { path: '/styles', element: <Styles /> }
    ]
    return useRoutes(routes);
}

export default Routes;

const Component: React.FC = () => {
    var { type, slug } = useParams();
    [type, slug] = [type || "assembly", slug || "home"];
    const { content, error } = useView({ type, slug });


    if (error && error.status === 404) {
        return (<NotFound />)
    }

    return (
        <>

            {content ?
                <>
                    <Renderer content={content} />
                    <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
                        {content?.fields?.references[0].fields.image?.fields.file.url &&
                            <CardMedia
                                component="img"
                                src={content?.fields?.references[0].fields.image.fields.file.url}
                                alt={content?.fields?.references[0].fields.image.fields.title}
                            />
                        }
                        <Typography variant="h1" component="h1" sx={{ p: 6 }}>
                            {content?.fields?.references[0].fields.headline}
                        </Typography>
                        <Container maxWidth="sm">
                            <ReactMarkdown >{content?.fields?.references[0].fields.body}</ReactMarkdown>
                        </Container>
                    </Stack>
                </>
                :
                <Outline />
            }
        </>
    )
}





const Styles: React.FC = () => {
    const Swatch = (props: any) => {
        const { color, variant } = props;
        const theme = useTheme();

        return (
            <Box sx={{
                alignItems: 'center',
                backgroundColor: `${color}.${variant}`,
                borderRadius: '8px',
                // color: theme.palette.getContrastText(theme.palette[color][variant]),
                display: 'flex',
                height: 80,
                justifyContent: 'center',
                textAlign: 'center',
                width: 80,
            }}>
                {/* {variant}<br />{theme.palette[color][variant]} */}
            </Box>
        );
    }

    const Palette = (props: any) => {
        const { color } = props;
        return (
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, my: 1 }}>
                <Typography variant="body1" sx={{ width: 100 }}>{color}</Typography>
                <Swatch color={color} variant="main" />

            </Box>
        );
    };

    return (
        <Paper sx={{ my: 2, p: 2 }}>
            <Typography variant="h1" gutterBottom>Sandra Kaminski</Typography>
            <Typography variant="h1" gutterBottom>h1. Headline 1</Typography>
            <Typography variant="h2" gutterBottom>h2. Headline 2</Typography>
            <Typography variant="h3" gutterBottom>h3. Headline 3</Typography>
            <Typography variant="h4" gutterBottom>h4. Headline 4</Typography>
            <Typography variant="h5" gutterBottom>h5. Headline 5</Typography>
            <Typography variant="h6" gutterBottom>h6. Headline 6</Typography>
            <Typography variant="subtitle1" gutterBottom>subtitle1</Typography>
            <Typography variant="subtitle2" gutterBottom>subtitle2</Typography>
            <Typography variant="body1" gutterBottom>body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget consequat ligula. Donec ac nunc quis diam efficitur semper ac vitae purus. Nullam quis ligula sed massa rutrum egestas ut vitae arcu. Pellentesque sollicitudin arcu eu ante pulvinar vulputate. Fusce pretium pharetra scelerisque. Vestibulum sit amet imperdiet leo. Vestibulum vitae sodales ligula. Nulla vel nulla sit amet sem condimentum pharetra. Quisque eget libero sed purus tincidunt bibendum at sed metus. Mauris iaculis sollicitudin nisl, id porttitor purus bibendum vitae. Sed tincidunt, erat vel dapibus vulputate, neque ex dictum urna, sed dapibus ex dolor ut odio. Cras volutpat nulla at nunc accumsan, vitae venenatis justo finibus. Nunc orci turpis, accumsan at aliquet ac, condimentum eget mi. Praesent in tincidunt dolor. Aliquam a facilisis leo, a placerat libero. Nulla vel fringilla nisl, vitae consectetur nulla.</Typography>
            <Typography variant="body2" gutterBottom>body2. Sed sit amet leo sit amet odio sollicitudin consectetur. Fusce vitae arcu orci. In et suscipit ipsum. Nunc at risus at enim feugiat hendrerit sed eu lacus. Nam in volutpat quam, vel maximus diam. Nullam vel feugiat elit. Nulla facilisis sapien a tortor commodo porta. Etiam erat nunc, cursus at eleifend ut, lobortis quis dolor. Pellentesque blandit arcu vel turpis finibus sagittis. Etiam facilisis in elit eget ornare.</Typography>
            <Typography variant="caption" gutterBottom sx={{ display: 'block ' }}>caption</Typography>
            <Typography variant="overline" gutterBottom sx={{ display: 'block ' }}>overline</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="text">Text Button</Button>
                <Button variant="contained">Contained Button</Button>
                <Button variant="outlined">Outlined Button</Button>
            </Box>
            <Typography variant="h1" gutterBottom sx={{ mt: 4 }}>Palette</Typography>
            <Palette color="primary" />
            <Palette color="secondary" />
            <Palette color="error" />
            <Palette color="warning" />
            <Palette color="info" />
            <Palette color="success" />
            <Typography variant="body1" color="GrayText" gutterBottom>color=&quot;GrayText&quot;</Typography>
        </Paper>
    )
}