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

    const title = content.fields.resources[0].fields.files;
    const title2 = content.fields.resources[1].fields.files; //[0].fields.title

    return (
        <Grid container spacing={2} sx={{ p: 10 }}>
            <Grid item lg={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        sx={{ width: content.fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
            </Grid>
            <Grid item lg={6}>
                <Typography align="center" variant="h1" component="h1" sx={{ p: 4 }}>
                    {content.fields.resources[0].fields.headline}
                </Typography>
                {title.map((item: any, index: number) => (
                    <Typography key={index} align="center" variant="body1" component="h1">
                        <Link to={`${item.fields.file.url}`} target="_blank">
                            {item.fields.title}
                        </Link>
                    </Typography>
                    
                ))}
                <Typography align="center" variant="h4" component="h1" sx={{ p: 4 }}>
                    {content.fields.resources[1].fields.headline}
                </Typography>
                {title2.map((item: any, index: number) => (
                    <Typography key={index} align="center" variant="body1" component="h1">
                        <Link to={`${item.fields.file.url}`} target="_blank">
                            {item.fields.title}
                        </Link>
                    </Typography>

                ))}
                <Grid item lg={6}>
                    

                </Grid>

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



{/* title.set(key, content.fields.resources[0].fields.files[0].fields.title[key])} */ }


{/* <Link to={`${content.fields.resources[0].fields.files[0].fields.file.url}`}>
                         
                            {content.fields.resources[0].fields.files[0].fields.title}
                        </Link> */}
