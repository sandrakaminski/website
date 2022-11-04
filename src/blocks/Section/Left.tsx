import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

import ReactMarkdown from 'react-markdown';
import { Markdown } from '../../shared';

type Content = {
    content: any
}

export const Left = (props: Content) => {
    const { content } = props;
    // console.log(content)
    const resources = content.fields.resources;
    const title = resources;
    const subtitle = content.fields.resources[1].fields.files; //[0].fields.title

    console.log("##", title[0]);

    return (
        <Grid container spacing={2} sx={{ p: 10 }}>
            <Grid item xs={12} md={4} lg={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                {resources.map((item: any, index: number) => (
                    <>
                        <Typography key={index} align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                            {item.fields.headline}
                            
                            {console.log("@@", item.fields["files"][0].fields.title)}
                            
                           {/* {console.log("!!", item.fields)} */}
                            {/* {files[0].fields.title} */}
                            
                        </Typography>
                        <Typography align="center" variant="body1" component="h1">
                            {item.fields["files"][0].fields.title}
                        </Typography>

                    </>
                ))}
            </Grid>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Grid >

    )
}
export default Left;
