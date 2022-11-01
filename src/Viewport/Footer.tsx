import React from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { FacebookIcon } from '../assets/FacebookIcon';
import { TumblrIcon } from '../assets/TumblrIcon';

const Footer: React.FC = () => {
    const date = new Date().getFullYear();

    return (
        <Stack component="footer" sx={{ py: 6 }} alignItems="center" justifyContent="center" spacing={2}>
            <Stack alignItems="center" spacing={2}>
                <Typography color="grayText" variant="body2">
                    {`All content © copyright  ${date} ${import.meta.env.VITE_APP_NAME}.`}
                </Typography >
                <Typography color="grayText" variant="body2">
                    All rights reserved.
                </Typography>
            </Stack>
            <Stack sx={{ '&:hover': { color: 'grayText' }, }} direction="row" alignItems="center" spacing={1}>
                {social.map((item, index) =>
                    <Link target="_blank" rel="noopener noreferrer" sx={{ '&:hover': { color: 'text.primary' }, }} color="inherit" href={item.link} key={index} >
                        {item.icon}
                    </Link>
                )}
            </Stack>
        </Stack>
    )
}
export default Footer;

type SocialArray = {
    icon: JSX.Element;
    link: string;
}

const social: SocialArray[] = [
    { icon: <FacebookIcon />, link: 'https://www.facebook.com/sandra.kaminskinz' },
    { icon: <TwitterIcon />, link: 'https://twitter.com/Sandrakaminski1' },
    { icon: <TumblrIcon />, link: 'https://sandrakaminskinz.tumblr.com/' },
    { icon: <PinterestIcon />, link: 'https://www.pinterest.com/stylistnz/' },
    { icon: <InstagramIcon />, link: 'https://www.instagram.com/sandra.kaminski/' }
]
