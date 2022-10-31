import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './Header';

interface LayoutProps {
    children: React.ReactNode
}

const Viewport = (props: LayoutProps) => {
    const { children } = props;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header />
            <Container maxWidth="lg">
                <Box sx={{ marginTop: 20 }}>
                    {children}
                </Box>

            </Container>
        </Box>
    )
}

export default Viewport