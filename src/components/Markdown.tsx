import { JSX } from "react";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

import DefaultImage from "./DefaultImage";

export const Markdown = {
    h1: ({ ...props }) => <TextElement variant="h4" {...props} />,
    h2: ({ ...props }) => <TextElement variant="h5" {...props} />,
    h3: ({ ...props }) => <TextElement variant="subtitle1" {...props} />,
    a: ({ ...props }) => <Link target="_blank" {...props} />,
    img: ({ ...props }) => (
        <DefaultImage
            style={{ width: "100%", height: "100%" }}
            src={props.src}
            alt={props.alt}
            {...props}
        />
    ),
    p: ({ ...props }) => (
        <TextElement paragraph align="justify" color="grayText" {...props} />
    ),
    hr: ({ ...props }) => <Underline {...props} />,
    ul: ({ ...props }) => <TextElement color="grayText" {...props} />,
    td: ({ ...props }) => (
        <TableCell
            sx={{
                borderBottom: "none",
                display: { xs: "block", md: "table-cell" },
            }}>
            {props.children}
        </TableCell>
    ),
};

export const SectionMarkDown = {
    a: ({ ...props }) => <Link target="_blank" sx={{ my: 2 }} {...props} />,
    p: ({ ...props }) => (
        <Typography
            id="sectionBody"
            data-testid="sectionBody"
            sx={{ mx: { md: 4 }, lineHeight: 1.75, maxWidth: { md: 600 } }}
            align="justify"
            variant="body1"
            textAlign="center"
            color="grayText"
            {...props}
        />
    ),
};

export default Markdown;

const TextElement = ({ ...props }): JSX.Element => {
    return (
        <Container
            data-testid="body"
            id="body"
            component={Typography}
            maxWidth={false}
            sx={{ maxWidth: 800 }}
            {...props}>
            {props.children}
        </Container>
    );
};

const Underline = ({ ...props }): JSX.Element => {
    return (
        <Container maxWidth={false} sx={{ maxWidth: 800 }}>
            <Divider sx={{ width: "100%" }} {...props} />
        </Container>
    );
};
