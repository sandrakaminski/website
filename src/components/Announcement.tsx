import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleNavigate = () => {
        navigate('shop/dreaming-in-petals')
        handleClose(); 
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
            <h1>Buy my new book: Dreaming in petals</h1>
            <Button onClick={() => handleNavigate()} >Dreaming in petals</Button>
        </Dialog>
    )
}
export default Announcement;