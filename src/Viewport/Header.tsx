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

import logo from '../assets/logo.png';
import getKontentData from "../client";

type Data = {
    nested_items: {
        value: string[]
    }
}

const Header: React.FC = () => {
    const [data, getData] = useState<Data>({ nested_items: { value: [] } });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    getKontentData({ name: "assembly", getData });

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
    const filter: string[] = data.nested_items?.value.filter((item: string) => item !== "home");

    return (
        <AppBar color="transparent" position="static" elevation={0}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link onClick={() => handleNavigate('home')} component="button" sx={{ cursor: 'pointer' }} underline="none" color="inherit">
                        <img style={{ width: 200, height: 'auto' }} src={logo} alt="Sandra Kaminski" />
                    </Link>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {filter?.map((item: string, index: number) =>
                        <Button color="inherit" onClick={() => handleNavigate(item)} key={index}>
                            {item}
                        </Button>
                    )}
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton onClick={handleClick} color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}   >
                        {filter?.map((item: string, index: number) =>
                            <MenuItem key={index} sx={{ textTransform: 'capitalize' }} onClick={() => { handleNavigate(item), handleClose() }}>{item}</MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>

    )
}
export default Header;