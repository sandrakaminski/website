import React from 'react'

import Container from '@mui/material/Container';

import Header from './Header';
import Footer from './Footer';

type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps) => {
    return (
        <>
            <Header />
            <Container sx={{ minHeight: '100vh' }} maxWidth="lg">
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Viewport