import React, { JSX } from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FacebookIcon from "./icons/FacebookIcon";
import TumblrIcon from "./icons/TumblrIcon";

const Footer = (): JSX.Element => {
    const date = new Date().getFullYear();
    const name = import.meta.env.VITE_APP_NAME || "Sandra Kaminski";

    return (
        <Stack
            component="footer"
            sx={{ mt: 8 }}
            alignItems="center"
            justifyContent="center"
            spacing={2}>
            <Stack alignItems="center" spacing={2}>
                <Typography align="center" color="grayText" variant="body1">
                    {`All content © copyright ${date} ${name}.`}
                </Typography>
                <Typography align="center" color="grayText" variant="body1">
                    All rights reserved.
                </Typography>
            </Stack>
            <Stack
                sx={{ "&:hover": { color: "grayText" } }}
                direction="row"
                alignItems="center"
                spacing={1}>
                {social.map((item, index) => (
                    <Link
                        target="_blank"
                        sx={{ "&:hover": { color: "text.primary" } }}
                        color="inherit"
                        href={item.link}
                        key={index}>
                        {item.icon}
                    </Link>
                ))}
            </Stack>
        </Stack>
    );
};
export default Footer;

const social = [
    {
        icon: <FacebookIcon />,
        link: "https://www.facebook.com/sandra.kaminskinz",
    },
    { icon: <TwitterIcon />, link: "https://twitter.com/Sandrakaminski1" },
    { icon: <TumblrIcon />, link: "https://sandrakaminskinz.tumblr.com/" },
    { icon: <PinterestIcon />, link: "https://www.pinterest.com/stylistnz/" },
    {
        icon: <InstagramIcon />,
        link: "https://www.instagram.com/sandra.kaminski/",
    },
];
