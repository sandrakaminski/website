import React from 'react';

import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LoadingImage from './LoadingImage';

export const Markdown: Record<string, unknown> = {
    a: ({ ...props }) => <Link target="_blank"  {...props} />,
    img: ({ ...props }, { alt, src }: any) => <LoadingImage skeletonheight={500} src={src} alt={alt} {...props} />,
    p: ({ ...props }) => <Typography sx={{ lineHeight: 1.75 }} paragraph align="justify" variant="body1" {...props} />,
    hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
}

export const SectionMarkDown = {
    a: ({ ...props }: any) => <Link target="_blank" size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography sx={{ mx: { md: 4 }, lineHeight: 1.75, maxWidth: { md: 600 } }} align="justify" variant="body1" textAlign="center" {...props} />
};

export default Markdown;
