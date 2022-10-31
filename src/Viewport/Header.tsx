import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import getKontentData from "../Client";

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
                <p>
                    Sandra Kaminski
                </p>
                {array?.value.map((item: string, index: number) =>
                    <Button onClick={() => handleNavigate(item)} color="secondary" key={index}>
                        {item}
                    </Button>
                )}
            </Toolbar>
        </AppBar>

    )
}
export default Header;