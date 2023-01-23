import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from "@tanstack/react-query";
import { Entry } from "contentful";

import Article from './Article';
import Contact from './Contact';
import ImageBanner from './ImageBanner';
import ImageContainer from './ImageContainer';
import Products from './Products';
import Profile from './Profile';
import Section from './Section';
import LoadingState from '@/components/Outline';
import { ContentProps, AnyEntry, AssemblyEntry } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks: Record<string, React.FC<ContentProps<any>>> = {
    "profile": Profile,
    "section": Section,
    "article": Article,
    "imageContainer": ImageContainer,
    "product": Products,
    "imageBanner": ImageBanner
}


const Factory = (props: ContentProps<AnyEntry>) => {
    const { contentEntry, detail } = props;
    const name = contentEntry?.sys.contentType.sys.id;

    if (!name) {
        return <></>
    }

    const block = blocks[name];
    return block({ contentEntry, detail })
}

const Renderer = (props: ContentProps<AnyEntry>) => {
    const { contentEntry } = props;

    return (
        <Box sx={{ my: 4 }}>
            <GridLayout contentEntry={contentEntry} />
            <DefaultLayout contentEntry={contentEntry} />
            <DetailedLayout contentEntry={contentEntry} />
            {contentEntry && <Contact />}
        </Box>
    )
}

export default Renderer;

const DetailedLayout = (props: ContentProps<AnyEntry>) => {
    const { contentEntry } = props;

    const content = (contentEntry as Entry<AssemblyEntry>)

    return (
        <>
            {content?.sys.contentType.sys.id !== 'assembly' &&
                <LoadingState type={"Detailed"} contentEntry={contentEntry} >
                    <Factory detail={true} contentEntry={contentEntry} />
                </LoadingState>
            }
        </>
    )
}

const DefaultLayout = (props: ContentProps<AnyEntry>) => {
    const { contentEntry } = props;

    const content = (contentEntry as Entry<AssemblyEntry>)

    return (
        <>
            {content?.sys.contentType.sys.id === 'assembly' && content?.fields.layout === 'Default' &&
                <LoadingState type={content?.fields.layout} contentEntry={content} >
                    {content.fields.references.map((block, index) =>
                        <Factory key={index} contentEntry={block} />
                    )}
                </LoadingState>
            }
        </>
    )
}

const GridLayout = (props: ContentProps<AnyEntry>) => {
    const { contentEntry } = props;


    const content = (contentEntry as Entry<AssemblyEntry>)
    const initialCount = 12;
    const [limit, setLimit] = useState<number>(initialCount);
    const [disable, setDisable] = useState<boolean>(false);

    const limitPage = () => {
        setLimit(limit + initialCount)
    }

    const setLayout = () => {
        if (limit > content?.fields.references?.length || limit === content?.fields.references?.length) {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
        return limit
    }

    useQuery([limit, window.location], setLayout)


    return (
        <>
            {content?.sys?.contentType.sys.id === 'assembly' && content?.fields.layout === 'Grid' &&
                <Grid sx={{ px: { lg: 4 } }} container spacing={2}>
                    {content.fields.references.slice(0, limit).map((block, index) =>
                        <Grid key={index} xs={12} sm={6} md={4} >
                            <LoadingState type={content?.fields.layout} contentEntry={contentEntry} >
                                <Factory contentEntry={block} />
                            </LoadingState>
                        </Grid>
                    )}
                    {content?.fields.references?.length > initialCount &&
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center" container sx={{ mt: 2 }}>
                            <Button disabled={disable} onClick={limitPage}>
                                Show more
                            </Button>

                        </Grid>
                    }
                </Grid>
            }
        </>
    )
}