import { useState, JSX, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/system";
import { Entry } from "contentful";

import type { MenuItemEntry } from "@/types";

type TMenuComponent = {
    menuItems: Entry<MenuItemEntry>[];
    handleNavigate: (path: string) => void;
    buttonSx: SxProps;
};

const Menu = (props: TMenuComponent): JSX.Element => {
    const { menuItems, buttonSx, handleNavigate } = props;
    const [open, setOpen] = useState<boolean>(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const select = (item: Entry<MenuItemEntry>) => {
        setOpen(false);
        handleNavigate(item.fields.slug);
    };

    useEffect(() => {
        if (!isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            <IconButton
                sx={{
                    display: { xs: "auto", md: "none" },
                    ...buttonSx,
                }}
                onClick={() => setOpen(true)}>
                <MenuIcon />
            </IconButton>

            <Drawer
                slotProps={{
                    paper: {
                        sx: { backgroundColor: "#fff", color: "#000" },
                    },
                }}
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: {
                        xs: "flex",
                        md: "none",
                    },
                    position: "fixed",
                }}>
                <Stack
                    sx={{
                        p: "20px",
                        pb: "4rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    direction="row">
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Stack
                    sx={{ px: "2.5rem" }}
                    spacing={2}
                    alignItems="start"
                    justifyContent="space-between">
                    {menuItems.map((item, index) => (
                        <Button
                            aria-label={item.fields.name}
                            color="inherit"
                            key={index}
                            onClick={() => select(item)}>
                            {item.fields.name}
                        </Button>
                    ))}
                    <Box
                        sx={{
                            borderTop: "1px solid #fff",
                            width: "100%",
                            py: "1rem",
                        }}
                    />
                </Stack>
            </Drawer>
        </>
    );
};
export default Menu;
