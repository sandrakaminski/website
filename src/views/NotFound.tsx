import React from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Stack
            sx={{ mt: 10 }}
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
            <Typography variant="h3" align="center" gutterBottom>
                Error 404
            </Typography>
            <Typography gutterBottom color="grayText" variant="h5" >
                The page you are looking for cannot be found.
            </Typography>
            <Button variant="outlined" onClick={() => navigate("/", { state: { data: 'home' } })}>Return Home</Button>
        </Stack>
    )
}
export default NotFound;