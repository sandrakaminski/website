import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <Typography variant="h2">
                Error 404
            </Typography>
            <Typography variant="h4">
                Page not found
            </Typography>
            <Button color="secondary" onClick={() => navigate("/", { state: { data: 'home' } })}>Return Home</Button>
        </Stack>
    )
}
export default NotFound;