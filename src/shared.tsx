import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Markdown: Record<string, unknown> = {
    a: ({ ...props }) => <Link target="_blank" rel="noopener noreferrer" {...props} />,
    img: ({ ...props }) => <img loading="lazy" style={{ width: '100%', marginTop: 2, marginBottom: 2 }} {...props} />,
    p: ({ ...props }) => <Typography color="grayText" variant="body1" {...props} />,
    hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
};

export const ArticleMarkdown: Record<string, unknown> = {
    a: ({ ...props }) => <Link target="_blank" rel="noopener noreferrer" {...props} />,
    img: ({ ...props }) => <img loading="lazy" style={{ width: '100%', marginTop: 20, marginBottom: 20 }} {...props} />,
    p: ({ ...props }) => <Typography color="grayText" variant="body1" {...props} />,
    hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
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
    detail: boolean;
    content: {
        fields: any
    }
}