import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import getKontentData from "../client";

type Data = {
    item: {
        elements: {
            nested_items: {
                value: string[]
            }
        }
    }
}

const Header: React.FC = () => {
    const [data, getData] = useState<Data>({ item: { elements: { nested_items: { value: [] } } } });
    const navigate = useNavigate();

    getKontentData({ name: "assembly", getData });
    const array = data?.item?.elements.nested_items

    const handleNavigate = (path: string) => {
        if (path === "home") {
            navigate("/", { state: { data: path } });
        }
        else {
            navigate(`/${path}`, { state: { data: path } });
        }
    }

    return (
        <AppBar >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography>
                        Sandra Kaminski
                    </Typography>
                </Box>
                {array?.value.map((item: string, index: number) =>
                    <Button color="inherit" onClick={() => handleNavigate(item)} key={index}>
                        {item}
                    </Button>
                )}
            </Toolbar>
        </AppBar>

    )
}
export default Header;