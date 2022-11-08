import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const SectionMarkDown: Object = {
    a: ({ ...props }: any) => <Link target="_blank" size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography variant="body1" textAlign="center" {...props} />,
};

