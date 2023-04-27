import React, { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AppBar from "@mui/material/AppBar";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from "@mui/material/Toolbar";
import { useQuery } from "@tanstack/react-query";
import { Entry, EntryCollection } from "contentful";
import { useNavigate } from "react-router-dom";

import logo from '@/assets/logo.png';
import LoadingState from "@/components/Outline";
import type { MenuEntry, MenuItemEntry } from '@/types';
import { useCartContext } from "@/views/Cart/cartProvider";
import { fetchContent } from "@/views/Content/api";

const Header = (): JSX.Element => {
    const res = useQuery(['menu', 'assembly', 'site-root', 1], fetchContent);
    const menuEntry = res.data as EntryCollection<MenuEntry>
    const allItems = menuEntry?.items[0].fields.references as Entry<MenuItemEntry>[]
    const menuItems = allItems?.filter(item => item.fields.slug !== 'home')

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { amount } = useCartContext();

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (): void => {
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

    return (
        <LoadingState contentEntry={menuItems} type="Header">
            <AppBar color="transparent" position="static" elevation={0}>
                {menuItems &&
                    <Toolbar >
                        <Box sx={{ flexGrow: 1 }}>
                            <Link onClick={() => handleNavigate('home')} component="button" sx={{ cursor: 'pointer' }} underline="none" color="inherit">
                                <Box component="img" sx={{ width: { xs: '40vw', sm: 200 } }} loading="lazy" src={logo} alt="Sandra Kaminski" />
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {menuItems.map((item, index) =>
                                <Button sx={{ mx: 1 }} color="inherit" onClick={() => handleNavigate(item.fields.slug)} key={index} >{item.fields.name}</Button>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton onClick={handleClick} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}   >
                                {menuItems.map((item, index) =>
                                    <MenuItem key={index} onClick={() => { handleNavigate(item.fields.slug) }} >  {item.fields.name}</MenuItem>
                                )}
                            </Menu>
                        </Box>
                        <IconButton color="inherit" onClick={() => handleNavigate('cart')}>
                            <Badge badgeContent={amount - 1 > 0 ? amount - 1 : 0} color="info">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                }
            </AppBar>
        </LoadingState>
    )
}

export default Header;