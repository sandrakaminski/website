import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import getKontentData from "../client";

type Data = {
    nested_items: {
        value: string[]
    }
}

const Header: React.FC = () => {
    const [data, getData] = useState<Data>({ nested_items: { value: [] } });
    const navigate = useNavigate();

    getKontentData({ name: "assembly", getData });

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
        <AppBar elevation={0}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link onClick={() => handleNavigate('home')} component="button" sx={{ cursor: 'pointer' }} underline="none" color="inherit">
                        Sandra Kaminski
                    </Link>
                </Box>
                {filter?.map((item: string, index: number) =>
                    <Button color="inherit" onClick={() => handleNavigate(item)} key={index}>
                        {item}
                    </Button>
                )}
            </Toolbar>
        </AppBar>

    )
}
export default Header;