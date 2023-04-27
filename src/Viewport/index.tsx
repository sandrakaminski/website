import React from 'react';

import Box from '@mui/material/Box';

import Footer from './Footer';
import Header from './Header';

type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps): JSX.Element => {
    return (
        <>
            <Header />
            <Box sx={{ mx: { xs: '0.25rem', md: '2.5rem' } }}>
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default Viewport