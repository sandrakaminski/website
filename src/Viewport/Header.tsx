import { JSX } from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import { useQuery } from "@tanstack/react-query";
import { Entry, EntryCollection } from "contentful";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";
import LoadingState from "@/components/Outline";
import type { MenuEntry, MenuItemEntry } from "@/types";
import Menu from "@/Viewport/Menu";
import { useCartContext } from "@/views/Cart/cartActions";
import { fetchContent } from "@/views/Content/api";

const Header = (): JSX.Element => {
    const res = useQuery({
        queryKey: ["menu", "assembly", "site-root", 1],
        queryFn: fetchContent,
    });
    const menuEntry = res.data as EntryCollection<MenuEntry>;
    const allItems = menuEntry?.items[0].fields
        .references as Entry<MenuItemEntry>[];
    const menuItems = allItems?.filter((item) => item.fields.slug !== "home");

    const navigate = useNavigate();
    const { state } = useCartContext();

    const handleNavigate = (path: string) => {
        if (path === "home") {
            navigate("/", { state: { data: path } });
        } else {
            navigate(`/${path}`, { state: { data: path } });
        }
    };

    return (
        <LoadingState contentEntry={menuItems} type="Header">
            <AppBar color="transparent" position="static" elevation={0}>
                {menuItems && (
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Link
                                data-testid="home-link"
                                onClick={() => handleNavigate("home")}
                                component="button"
                                sx={{ cursor: "pointer" }}
                                underline="none"
                                color="inherit">
                                <Box
                                    data-testid="logo"
                                    component="img"
                                    sx={{ width: { xs: "40vw", sm: 200 } }}
                                    loading="lazy"
                                    src={logo}
                                    alt="Sandra Kaminski"
                                />
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            {menuItems.map((item, index) => (
                                <Button
                                    data-testid={`nav-${item.fields.name}`}
                                    sx={{ mx: 1 }}
                                    color="inherit"
                                    onClick={() =>
                                        handleNavigate(item.fields.slug)
                                    }
                                    key={index}>
                                    {item.fields.name}
                                </Button>
                            ))}
                        </Box>
                        <Menu
                            menuItems={menuItems}
                            handleNavigate={handleNavigate}
                            buttonSx={{ color: "inherit" }}
                        />

                        <IconButton
                            color="inherit"
                            onClick={() => handleNavigate("cart")}>
                            <Badge badgeContent={state.amount} color="info">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                )}
            </AppBar>
        </LoadingState>
    );
};

export default Header;
