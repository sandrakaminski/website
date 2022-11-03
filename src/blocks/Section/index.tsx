import React from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

import ReactMarkdown from 'react-markdown';
// import Markdown from './shared';


export const Section = (props: Content) => {
    const { content } = props;

    console.log(content)
    switch (content.fields.references[0].fields.sectionType) {
        // case "Right":
        //     return <Right content={content} />
        case "Left":
            return <Left content={content} />
        case "Center":
            return <Center content={content} />
        default:
            return <Center content={content} />
    }
}
export default Section;

type Content = {
    content: any
}

const Center = (props: Content) => {
    const { content } = props;
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
            {content?.fields?.references[0].fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: content?.fields?.references[0].fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
                    component="img"
                    src={content?.fields?.references[0].fields.image.fields.file.url}
                    alt={content?.fields?.references[0].fields.image.fields.title}
                />
            }
            <Typography variant="h1" component="h1" sx={{ p: 6 }}>
                {content?.fields?.references[0].fields.headline}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown >
                    {content?.fields?.references[0].fields.body}
                </ReactMarkdown>
            </Container>
        </Stack>
    )
}

const Left = (props: Content) => {
    const { content } = props;
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
            {content?.fields?.references[0].fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: content?.fields?.references[0].fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
                    component="img"
                    src={content?.fields?.references[0].fields.image.fields.file.url}
                    alt={content?.fields?.references[0].fields.image.fields.title}
                />
            }
            <Typography variant="h1" component="h1" sx={{ p: 6 }}>
                {content?.fields?.references[0].fields.headline}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown >
                    {content?.fields?.references[0].fields.body}
                </ReactMarkdown>
            </Container>
        </Stack>
    )
}



    // return (
    //     <Stack direction="column" alignItems="center" justifyContent="center" sx={{ p: 8 }}>
    //         {content?.fields?.references[0].fields.image?.fields.file.url &&
    //             <CardMedia
    //                 sx={{ width: content?.fields?.references[0].fields.bannerStyle === false ? "60%" : "100%", height: 'auto' }}
    //                 component="img"
    //                 src={content?.fields?.references[0].fields.image.fields.file.url}
    //                 alt={content?.fields?.references[0].fields.image.fields.title}
    //             />
    //         }
    //         <Typography variant="h1" component="h1" sx={{ p: 6 }}>
    //             {content?.fields?.references[0].fields.headline}
    //         </Typography>
    //         <Container maxWidth="sm">
    //             <ReactMarkdown >
    //                 {content?.fields?.references[0].fields.body}
    //             </ReactMarkdown>
    //         </Container>
    //     </Stack>
    // )