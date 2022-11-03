import Button from '@mui/material/Button';

export const Markdown = {
    a: ({ ...props }: any) => <Button size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    img: ({ ...props }: any) => <img style={{ width: '60vw' }} {...props} />
};