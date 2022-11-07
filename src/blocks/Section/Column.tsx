import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import { Markdown } from '../../shared';

type Content = {
    content: any;
}

export const Column = (props: Content) => {
    const { content } = props;
    const resources = content.fields.resources;

    return (
        <Box sx={{ p: 5 }}>
            <Typography align="left" variant="h2" component="h1" >
                {content.fields.headline}
            </Typography>
            <Grid container>
                {resources.map((item: any, index: number) => (
                    <Grid item key={index} xs={12} md={6} >
                        <Typography align="center" variant="h2" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        <Resource resource={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Column;

export const CenterMD = {
    a: ({ ...props }: any) => <Button size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    p: ({ ...props }: any) => <Typography variant="body1" textAlign="center" {...props} />,
};