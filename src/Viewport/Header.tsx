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
import { useNavigate } from "react-router-dom";

import logo from '@/assets/logo.png';
import { useCartContext } from "@/views/Cart/cartProvider";
import { useMenu } from "@/client";
import type { MenuItemType } from '@/client';

const Header: React.FC = () => {
    const { menuItems } = useMenu();
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
        if (path === "home") {
            navigate("/", { state: { data: path } });
        }
        else {
            navigate(`/${path}`, { state: { data: path } });
        }
    }

    return (
        <AppBar color="transparent" position="static" elevation={0}>
            {menuItems &&
                <Toolbar >
                    <Box sx={{ flexGrow: 1 }}>
                        <Link onClick={() => handleNavigate('home')} component="button" sx={{ cursor: 'pointer' }} underline="none" color="inherit">
                            <img style={{ width: 200, height: 'auto' }} src={logo} alt="Sandra Kaminski" />
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((item: MenuItemType, index: number) =>
                            <MenuButton item={item} onClick={() => handleNavigate(item.fields.slug)} key={index} />
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={handleClick} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}   >
                            {menuItems.map((item: MenuItemType, index: number) =>
                                <SmallMenuButton item={item} key={index} onClick={() => { handleNavigate(item.fields.slug), handleClose() }} />
                            )}
                        </Menu>
                    </Box>
                    <IconButton color="inherit" onClick={() => handleNavigate('cart')}>
                        <Badge badgeContent={amount.length - 1 > 0 ? amount.length - 1 : 0} color="info">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            }
        </AppBar>

    )
}
export default Header;

type MenuButtonProps = {
    item: MenuItemType;
    onClick: () => void;
}

const SmallMenuButton = (props: MenuButtonProps) => {
    const { item } = props;

    return (
        <>
            {item.fields.slug === 'home' ?
                null
                :
                <MenuItem {...props}>
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