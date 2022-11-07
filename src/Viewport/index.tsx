import React from 'react'

import Container from '@mui/material/Container';

import ContactUs from '../blocks/ContactUs';
import Footer from './Footer';
import Header from './Header';

type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps) => {
    return (
        <>
            <Header />
            <Container sx={{ minHeight: '100vh' }} maxWidth="lg">
                {children}
                <ContactUs />
            </Container>
            <Footer />
        </>
    )
}

export default Viewport