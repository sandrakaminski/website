import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import { SectionMarkDown } from './SectionProps';
import type { Content, ResourceType } from './SectionTypes';

export const Center = (props: Content) => {
    const { content } = props;

    return (
        <>
            {content.fields.image?.fields.file.url &&
                <CardMedia
                    sx={{ width: '100%', height: 'auto' }}
                    component="img"
                    src={content.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title}
                />
            }
            <Typography align="center" variant="h1" sx={{ p: 6 }}>
                {content.fields.headline}
            </Typography>
            {content.fields.resources?.map((item: ResourceType, index: number) => (
                <Stack key={index} justifyContent="center" alignContent="center">
                    <Typography align="center" variant="h4" sx={{ p: 4 }}>
                        {item.fields.headline}
                    </Typography>
                    <Resource resource={item} />
                </Stack>
            ))}
            <Container maxWidth="sm">
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} >
                    <ReactMarkdown components={SectionMarkDown} >
                        {content.fields.body}
                    </ReactMarkdown>
                    {content.fields.ctaLabel &&
                        <Button href={content.fields.ctaSlug} variant="contained" sx={{ mt: 4, mb: 4 }}>
                            {content.fields.ctaLabel}
                        </Button>
                    }
                </Stack>
            </Container>
        </>
    )
}

export default Center;