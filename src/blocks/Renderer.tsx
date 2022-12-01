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
import Outline from '@/components/Outline';

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
    const name: string = content && content.sys.contentType.sys.id;

    if (!content || !name) {
        return <Outline />
    }
    return blocks[name]({ content, detail })
}

const Renderer = (props: FactoryProps) => {
    const { content } = props;

    return (
        <Box sx={{ my: 4 }}>
            {content && content.sys.contentType.sys.id === 'assembly'
                ?
                <>
                    {content.fields.layout === 'Grid'
                        ?
                        <GridLayout content={content} />
                        :
                        <Box>
                            {content.fields.references.map((block, index) =>
                                <Factory key={index} content={block} />
                            )}
                        </Box>
                    }
                </>
                :
                <Factory detail={true} content={content} />
            }
            <ContactUs />
        </Box>
    )
}

export default Renderer;

const GridLayout = (props: any) => {
    const { content } = props;

    const initialCount = 12;
    const [limit, setLimit] = useState<number>(initialCount);

    const limitPage = () => {
        setLimit(limit + initialCount)
    }


    return (
        <>
            {content &&
                <>
                    <Grid sx={{ px: { lg: 4 } }} container spacing={2}>
                        {content.fields.references.slice(0, limit).map((block: any, index: number) =>
                            <Grid key={index} xs={12} sm={6} md={4} >
                                <Factory content={block} />
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