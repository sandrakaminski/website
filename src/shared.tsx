import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const Markdown = {
    a: ({ ...props }: any) => <Button target="_blank" rel="noopener noreferrer" sx={{ my: 2 }} variant="outlined" {...props} />,
    img: ({ ...props }: any) => <img style={{ width: '100%', marginTop: 2, marginBottom: 2 }} {...props} />,
    p: ({ ...props }: any) => <Typography color="grayText" variant="body1" {...props} />,
    hr: ({ ...props }: any) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }: any) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
};

export const ArticleMarkdown = {
    a: ({ ...props }: any) => <Link target="_blank" rel="noopener noreferrer" {...props} />,
    img: ({ ...props }: any) => <img style={{ width: '100%', marginTop: 20, marginBottom: 20 }} {...props} />,
    p: ({ ...props }: any) => <Typography color="grayText" variant="body1" {...props} />,
    hr: ({ ...props }: any) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }: any) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
}

export type Image = {
    fields: {
        file: {
            url: string;
            title?: string;
        }
        title: string;
        description?: string;
    }
}
export type BlockProps = {
    detail: Boolean;
    content: {
        fields: any[]
    };
}