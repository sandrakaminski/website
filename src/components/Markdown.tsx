import React from 'react';

import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

type Img = {
    alt: string;
    src: string;
}

export const Markdown: Record<string, unknown> = {
    a: ({ ...props }) => <Link target="_blank"  {...props} />,
    img: ({ ...props }, { alt, src }: Img) => <img style={{ width: '100%' }} src={src} alt={alt} {...props} />,
    p: ({ ...props }) => <Typography sx={{ lineHeight: 1.75, maxWidth: 800, alignContent: 'flexStart' }} color="grayText" paragraph align="justify" variant="body1" {...props} />,
    hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
    ul: ({ ...props }) => <Typography sx={{ lineHeight: 1.75 }} color="grayText" paragraph align="justify" variant="body1" {...props} />,
    thead: ({ ...props }) => <TableHead {...props} />,
    tr: ({ ...props }) => <TableRow {...props} />,
    td: ({ ...props }) => <TableCell sx={{ borderBottom: 'none' }} {...props} />,

}

export const SectionMarkDown = {
    a: ({ ...props }) => <Link target="_blank" sx={{ my: 2 }} {...props} />,
    p: ({ ...props }) => <Typography sx={{ mx: { md: 4 }, lineHeight: 1.75, maxWidth: { md: 600 } }} align="justify" variant="body1" textAlign="center" {...props} />
};

export default Markdown;
