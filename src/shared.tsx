import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const Markdown = {
    a: ({ ...props }: any) => <Button target="_blank" rel="noopener noreferrer" size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    img: ({ ...props }: any) => <img style={{ width: '60vw' }} {...props} />,
    p: ({ ...props }: any) => <Typography color="grayText" variant="body1" {...props} />,
    hr: ({ ...props }: any) => <Divider sx={{ my: 2 }} {...props} />,
};

export const ArticleMarkdown = {
    a: ({ ...props }: any) => <Link target="_blank" rel="noopener noreferrer" {...props} />,
    img: ({ ...props }: any) => <img style={{ width: '60vw' }} {...props} />,
    p: ({ ...props }: any) => <Typography color="grayText" variant="body1" {...props} />,
    hr: ({ ...props }: any) => <Divider sx={{ my: 2 }} {...props} />,
}

export type Image = {
    fields: {
        file: {
            url: string;
        }
        title: string;
        description: string;
    }
}
export interface BlockProps {
    detail: Boolean;
    content: any;
}