import React from 'react';

import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Img = {
    alt: string;
    src: string;
}

export const Markdown: Record<string, unknown> = {
    a: ({ ...props }) => <Link target="_blank"  {...props} />,
    img: ({ ...props }, { alt, src }: Img) => <img style={{ width: '100%' }} src={src} alt={alt} {...props} />,
    p: ({ ...props }) => <Typography sx={{ lineHeight: 1.75 }} paragraph align="justify" variant="body1" {...props} />,
    hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
}

export const SectionMarkDown = {
    a: ({ ...props }) => <Link target="_blank" sx={{ my: 2 }} {...props} />,
    p: ({ ...props }) => <Typography sx={{ mx: { md: 4 }, lineHeight: 1.75, maxWidth: { md: 600 } }} align="justify" variant="body1" textAlign="center" {...props} />
};

export default Markdown;
