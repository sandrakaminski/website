import React from 'react';

import Box from '@mui/material/Box';

import Footer from './Footer';
import Header from './Header';
// import Announcement from '@/components/Announcement';

type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps) => {
    return (
        <>
            <Header />
            {/* <Announcement /> */}
            <Box sx={{ mx: { xs: '0.25rem', md: '2.5rem' } }}>
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default Viewport