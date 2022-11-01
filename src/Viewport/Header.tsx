import React, { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import logo from '@/assets/logo.png';
import getData from "@/client";

type Data = Array<any>

const Header: React.FC = () => {
    const [data, setData] = useState<Data>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    getData({ name: "assembly", setData });

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
    // hides home from nav menu
    const menu = data?.filter((item) => item.fields.slug !== "home");

    return (
        <AppBar color="transparent" position="static" elevation={0}>
            {menu &&
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link onClick={() => handleNavigate('home')} component="button" sx={{ cursor: 'pointer' }} underline="none" color="inherit">
                            <img style={{ width: 200, height: 'auto' }} src={logo} alt="Sandra Kaminski" />
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menu.map((item, index) =>
                            <Button color="inherit" onClick={() => handleNavigate(item.fields.slug)} key={index}>
                                {item.fields.name}
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={handleClick} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}   >
                            {menu.map((item, index) =>
                                <MenuItem key={index} onClick={() => { handleNavigate(item.fields.slug), handleClose() }}>{item.fields.name}</MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            }
        </AppBar>

    )
}
export default Header;