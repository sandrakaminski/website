import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ReactMarkdown from 'react-markdown';
import { Markdown } from '../../shared';

type Content = {
    content: any;
}

export const Column = (props: Content) => {
    const { content } = props;

    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
            <Typography variant="h1" sx={{ p: 6 }}>
                {content.fields.headline}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={CenterMD} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Stack >
    )
}

export default Column;

export const CenterMD = {
    a: ({ ...props }: any) => <Button size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography variant="body1" textAlign="center" {...props} />,
};