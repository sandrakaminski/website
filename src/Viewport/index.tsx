import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode
}

const Viewport = (props: LayoutProps) => {
    const { children } = props;

    return (
        <Box sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <Header />
            <Container sx={{ minHeight: '100vh' }} maxWidth="lg">
                {children}
            </Container>
            <Footer />
        </Box>
    )
}

export default Viewport