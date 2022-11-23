import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Markdown: Record<string, unknown> = {
    a: ({ ...props }) => <Link target="_blank"  {...props} />,
    img: ({ ...props }) => <CardMedia component="img" loading="lazy" sx={{ width: '100%', my: 6 }} {...props} />,
    p: ({ ...props }) => <Typography sx={{ lineHeight: 1.75 }} paragraph align="justify" variant="body1" {...props} />,
    hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
    div: ({ ...props }) => <Stack justifyContent="center" alignItems="center" direction="row" {...props} />,
}

export const SectionMarkDown: Object = {
    a: ({ ...props }: any) => <Link target="_blank" size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography sx={{ mx: { md: 4 }, lineHeight: 1.75, maxWidth: { md: 600 } }} align="justify" variant=" body1" textAlign="center" {...props} />
};



// consistent image type
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

// used for profile/article components
export type BlockProps = {
    detail: boolean;
    content: {
        fields: {
            slug: string;
            body: string;
            otherImages: Image[];
            image: Image;
            headline: string;
            author: Author;
            name: string;
            title: string;
            date: string;
            coverImage: Image;
        }
    }
}
type Author = {
    fields: {
        name: string;
        slug: string;
        image?: Image;
    }
}