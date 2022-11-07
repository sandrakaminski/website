import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Resource from './Resource';
import type { Content, ResourceType } from './SectionTypes';

export const Column = (props: Content) => {
    const { content } = props;

    return (
        <Box sx={{ p: 5 }}>
            <Typography align="left" variant="h2" component="h1" >
                {content.fields.headline}
            </Typography>
            <Grid container>
                {content.fields.resources.map((item: ResourceType, index: number) => (
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