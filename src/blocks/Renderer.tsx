import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import Article from './Article';
import ContactUs from './ContactUs';
import ImageBanner from './ImageBanner';
import ImageContainer from './ImageContainer';
import Products from './Products';
import Profile from './Profile';
import Section from './Section';
import LoadingState from '@/components/Outline';

type Blocks = {
    [key: string]: any;
}

const blocks: Blocks = {
    profile: Profile,
    section: Section,
    article: Article,
    imageContainer: ImageContainer,
    product: Products,
    imageBanner: ImageBanner
}

type FactoryProps = {
    content: {
        fields: {
            type: string;
            references: any[];
            layout: string;
        }
        sys: {
            contentType: {
                sys: {
                    id: string;
                }
            }
        }
    };
    detail?: boolean;
}

const Factory = (props: FactoryProps) => {
    const { content, detail } = props;
    const name: string = content?.sys.contentType.sys.id;

    if (!content || !name) {
        return
    }
    return blocks[name]({ content, detail })
}

const Renderer = (props: FactoryProps) => {
    const { content } = props;

    return (
        <Box sx={{ my: 4 }}>
            <GridLayout content={content} />
            <DefaultLayout content={content} />
            <DetailedLayout content={content} />
            <ContactUs />
        </Box>
    )
}

export default Renderer;

const DetailedLayout = (props: FactoryProps) => {
    const { content } = props;

    return (
        <>
            {content && content.sys.contentType.sys.id !== 'assembly' &&
                <LoadingState type={"Default"} content={content} >
                    <Factory detail={true} content={content} />
                </LoadingState>
            }
        </>
    )
}

const DefaultLayout = (props: FactoryProps) => {
    const { content } = props;

    return (
        <>
            {content?.sys.contentType.sys.id === 'assembly' && content?.fields.layout === 'Default' &&
                <LoadingState type={content?.fields.layout} content={content} >
                    {content.fields.references.map((block: any, index: number) =>
                        <Factory key={index} content={block} />
                    )}
                </LoadingState>
            }
        </>
    )
}

const GridLayout = (props: FactoryProps) => {
    const { content } = props;

    const initialCount = 12;
    const [limit, setLimit] = useState<number>(initialCount);

    const limitPage = () => {
        setLimit(limit + initialCount)
    }

    return (
        <>
            {content?.sys.contentType.sys.id === 'assembly' && content?.fields.layout === 'Grid' &&
                <>
                    <Grid sx={{ px: { lg: 4 } }} container spacing={2}>
                        {content.fields.references.slice(0, limit).map((block: any, index: number) =>
                            <Grid key={index} xs={12} sm={6} md={4} >
                                <LoadingState type={content?.fields.layout} content={content} >
                                    <Factory content={block} />
                                </LoadingState>
                            </Grid>
                        )}
                    </Grid>
                    {content.fields.references.length > 12 &&
                        <Stack alignItems="center" sx={{ mt: 2 }}>
                            <Button disabled={limit > content.fields.references.length} onClick={limitPage}>
                                Show more
                            </Button>
                        </Stack>
                    }
                </>
            }
        </>
    )
}