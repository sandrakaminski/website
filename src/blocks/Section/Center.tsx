import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import type { Content, ResourceType } from './SectionTypes';
import { SectionMarkDown } from '@/shared';

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
            {content.fields.headline &&
                <Typography align="center" variant="h3" sx={{ p: { xs: 2, md: 4 } }}>
                    {content.fields.headline}
                </Typography>
            }
            {content.fields.resources?.map((item: ResourceType, index: number) => (
                <Stack key={index} justifyContent="center" alignContent="center"  sx={{ p: 2 }}>
                    <Typography align="center" variant="h2">
                        {item.fields.headline}
                    </Typography>
                    <Resource resource={item} />
                </Stack>
            ))}
            <Stack justifyContent="center" direction="column" alignItems="center" spacing={2} >
                <ReactMarkdown components={SectionMarkDown} >
                    {content.fields.body}
                </ReactMarkdown>
                {content.fields.ctaLabel &&
                    <Button href={content.fields.ctaSlug} variant="contained" sx={{ mt: 4, mb: 4 }}>
                        {content.fields.ctaLabel}
                    </Button>
                }
            </Stack>
        </>
    )
}

export default Center;