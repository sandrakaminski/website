import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import ReactMarkdown from 'react-markdown';
import { Markdown } from '../../shared';

type Content = {
    content: any;
}

export const Column = (props: Content) => {
    const { content } = props;

    const resources = content.fields.resources;

    // console.log("COLUMN", content)

    return (
        <Box sx={{p: 5}}>
            <Typography align="left" variant="h2" component="h1" >
                {content.fields.headline}
            </Typography>
            <Grid container>
                {resources.map((item: any, index: number) => (
                    <Grid item key={index} xs={12} md={6} lg={6}>
                        <Typography align="center" variant="h2" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        {item.fields.files.map((file: any, index: number) => (
                            <Box key={index}>
                                {item.fields.flexDirection === "Flex" ?
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                                        <Typography align="center" variant="body1" component="h1">
                                            <Link href={`${file.fields.file.url}`} target="_blank">
                                                {file.fields.title}
                                            </Link>
                                        </Typography>
                                    </Box>
                                    :
                                    <Box>
                                        <Typography align="center" variant="body1" component="h1">
                                            <Link href={`${file.fields.file.url}`} target="_blank">
                                                {file.fields.title}
                                            </Link>
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        ))}
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