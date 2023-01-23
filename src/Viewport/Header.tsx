import React, { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AppBar from "@mui/material/AppBar";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from "@mui/material/Toolbar";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { Entry, EntryCollection } from "contentful";
import { useNavigate } from "react-router-dom";

import logo from '@/assets/logo.png';
import { fetchContent } from "@/client";
import LoadingState from "@/components/Outline";
import type { MenuEntry, MenuItemEntry } from '@/types';
import { useCartContext } from "@/views/Cart/cartProvider";

const headers = [
    { name: 'Shop', slug: '/shop' },
    { name: 'Inspiration', slug: 'https://sandrakaminski.com/diy' },
    { name: 'Resources', slug: 'https://sandrakaminski.com/resources' },
    { name: 'About', slug: 'https://sandrakaminski.com/about' },
    { name: 'Blog', slug: 'https://sandrakaminski.com/blog' },
    { name: 'Contact', slug: 'https://sandrakaminski.com/contact' },
]

const Header: React.FC = () => {
    const res = useQuery(['menu', 'assembly', 'site-root', 1], fetchContent);
    const menuEntry = res.data as EntryCollection<MenuEntry>
    const allItems = menuEntry?.items[0].fields.references as Entry<MenuItemEntry>[]
    const menuItems = allItems?.filter(item => item.fields.slug !== 'home')

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { amount } = useCartContext();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    const handleNavigate = (path: string) => {
        setAnchorEl(null);
        if (path === "home") {
            navigate("/", { state: { data: path } });
        }
        else {
            navigate(`/${path}`, { state: { data: path } });
        }
    }

    // this statement is only used for rendering the shop on SQSP, we will remove this in favour of the old menu upon launch
    if (import.meta.env.MODE === "development") {
        return (
            <LoadingState contentEntry={menuItems} type="Header">
                <AppBar color="transparent" position="static" elevation={0}>
                    {menuItems &&
                        <Toolbar >
                            <Box sx={{ flexGrow: 1 }}>
                                <Link onClick={() => handleNavigate('home')} component="button" sx={{ cursor: 'pointer' }} underline="none" color="inherit">
                                    <CardMedia component="img" sx={{ width: { xs: '40vw', sm: 200 } }} loading="lazy" src={logo} alt="Sandra Kaminski" />
                                </Link>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {menuItems.map((item, index) =>
                                    <MenuButton item={item} onClick={() => handleNavigate(item.fields.slug)} key={index} />
                                )}
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton onClick={handleClick} color="inherit">
                                    <MenuIcon />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}   >
                                    {menuItems.map((item, index) =>
                                        <SmallMenuButton item={item} key={index} onClick={() => { handleNavigate(item.fields.slug) }} />
                                    )}
                                </Menu>
                            </Box>
                            <IconButton color="inherit" onClick={() => handleNavigate('cart')}>
                                <Badge badgeContent={amount && amount - 1 > 0 ? amount - 1 : 0} color="info">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    }
                </AppBar>
            </LoadingState>
        )
    }
    else {
        return (
            <LoadingState contentEntry={menuItems} type="Header">
                <AppBar color="transparent" position="static" elevation={0}>
                    <Toolbar >
                        <Box sx={{ flexGrow: 1 }}>
                            <Link
                                href="https://sandrakaminski.com/"
                                sx={{ cursor: 'pointer', }} underline="none" color="inherit">
                                <CardMedia component="img" sx={{ width: { xs: '40vw', sm: 200 } }} loading="lazy" src={logo} alt="Sandra Kaminski" />
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {headers.map((item: MenuItemEntry, index: number) =>
                                <Button href={item.slug} key={index} sx={{ mx: 1 }} >
                                    {item.name}
                                </Button>
                            )}
                            <IconButton color="inherit" onClick={() => handleNavigate('cart')}>
                                <Badge badgeContent={amount && amount - 1 > 0 ? amount - 1 : 0} color="info">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton onClick={handleClick} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}   >
                                <Stack>
                                    {headers.map((item: MenuItemEntry, index: number) =>
                                        <Button
                                            key={index}
                                            href={item.slug}>
                                            {item.name}
                                        </Button>
                                    )}
                                </Stack>
                            </Menu>
                            <IconButton color="inherit" onClick={() => handleNavigate('cart')}>
                                <Badge badgeContent={amount && amount - 1 > 0 ? amount - 1 : 0} color="info">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>

                    </Toolbar>
                </AppBar >
            </LoadingState >
        )
    }
}
export default Header;

type MenuButtonProps = {
    item: Entry<MenuItemEntry>;
    onClick: () => void;
    href?: string;
}

const SmallMenuButton = (props: MenuButtonProps) => {
    const { item } = props;

    return (
        <>
            {item.fields.slug === 'home' ?
                null
                :
                <MenuItem  {...props}>
                    {item.fields.name}
                </MenuItem>
            }
        </>
    )

}

const MenuButton = (props: MenuButtonProps) => {
    const { item } = props;

    return (
        <>
            {item.fields.slug === 'home' ?
                null
                :
                <Button sx={{ mx: 1 }} color="inherit" {...props}>
                    {item.fields.name}
                </Button>
            }
        </>
    )
}