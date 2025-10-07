import { useState, JSX } from "react";

import { InputBase, InputBaseProps, InputLabel, Stack } from "@mui/material";
import Box from "@mui/material/Box";

interface TextProps extends InputBaseProps {
    label?: string;
    multiline?: boolean;
    error?: boolean;
}

const InputField = (props: TextProps): JSX.Element => {
    const { label, multiline, error } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <Stack spacing={1}>
            <InputLabel
                sx={{
                    color: error
                        ? (theme) => theme.palette.error.main
                        : (theme) => theme.palette.primary.main,
                }}>
                {label}
            </InputLabel>
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        p: "2px",

                        borderRadius: "0.25rem",
                        background: isFocused
                            ? "black"
                            : error
                            ? (theme) => theme.palette.error.main
                            : "#969696",
                        WebkitMask:
                            "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                        WebkitMaskComposite: "destination-out",
                        maskComposite: "exclude",
                        pointerEvents: "none",
                    }}
                />
                <InputBase
                    fullWidth
                    error={error}
                    multiline={multiline}
                    minRows={multiline ? 6 : undefined}
                    maxRows={multiline ? 6 : 0}
                    sx={{
                        px: 2,
                        mt: multiline ? "12px" : 0,
                        border: "none",
                        height: multiline ? "auto" : 60,
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </Box>
        </Stack>
    );
};

export default InputField;
