import React, { useState, useEffect } from 'react';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useRoutes, useLocation, useNavigate } from 'react-router-dom';

import getKontentData from "./client";

interface Data {
    name: {
        value: string
    }
}

const Routes: React.FC = () => {
    const routes = [
        { path: '/', element: <Component /> },
        { path: '/:page', element: <Component /> },
        { path: '/styles', element: <Styles /> },
        { path: '/404', element: <NotFound /> },
    ]
    return useRoutes(routes);
}

export default Routes;

const Component: React.FC = () => {
    const page = useLocation();
    const navigate = useNavigate();
    const [pageVal, setPageVal] = useState<string>('');
    const [data, getData] = useState<Data>({ name: { value: '' } });

    useEffect(() => {
        if (!page.state) {
            navigate('/404');
        }
        else {
            setPageVal(page?.state?.data)
        }
    }, [page?.state?.data, pageVal]);

    const defaultVal = page?.state?.data;
    getKontentData({ name: pageVal ? pageVal : defaultVal, getData });

    return (
        <Typography variant="h2">
            {data && data.name.value}
        </Typography>
    )
}

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <Typography variant="h2">
                Error 404
            </Typography>
            <Typography variant="h4">
                Page not found
            </Typography>
            <Button onClick={() => navigate("/", { state: { data: 'home' } })}>Return Home</Button>
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
                <Swatch color={color} variant="light" />
                <Swatch color={color} variant="dark" />
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