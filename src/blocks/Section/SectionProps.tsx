import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const SectionMarkDown: Object = {
    a: ({ ...props }: any) => <Button size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography variant="body1" textAlign="center" {...props} />,
};

