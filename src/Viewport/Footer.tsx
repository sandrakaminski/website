import React from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { FacebookIcon } from '../assets/FacebookIcon';
import { TumblrIcon } from '../assets/TumblrIcon';

const Footer = () => {
    return (
        <Stack component="footer" sx={{ py: 6 }} alignItems="center" justifyContent="center" spacing={2}>
            <Stack alignItems="center" spacing={2}>
                <Typography color="grayText" variant="body2">
                    All content © copyright 2022 Sandra Kaminski.
                </Typography >
                <Typography color="grayText" variant="body2">
                    All rights reserved.
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <FacebookIcon />
                <TwitterIcon />
                <TumblrIcon />
                <PinterestIcon />
                <InstagramIcon />
            </Stack>
        </Stack>
    )
}
export default Footer;
