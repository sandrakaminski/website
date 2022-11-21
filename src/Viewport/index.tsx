import React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';

import Footer from './Footer';
import Header from './Header';

type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps) => {
    return (
        <>
            <Header />
            <Stack sx={{ minHeight: '100vh', px: { xs: '15px', sm: '25px', lg: '48px', xl: '65px' } }}  >
                <Box sx={{ mx: { xs: '15px', sm: '25px' } }}>
                    {children}
                </Box>
            </Stack>
            <Footer />
        </>
    )
}

export default Viewport