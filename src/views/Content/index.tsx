import React, { lazy, useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from "@tanstack/react-query";
import { Entry } from 'contentful';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { fetchContent } from './api';
import Article from './Article';
import Contact from './Contact';
import ImageBanner from './ImageBanner';
import ImageContainer from './ImageContainer';
import Products from './Products';
import Profile from './Profile';
import Section from './Section';
import LoadingState from '@/components/Outline';
import { ContentEntryProps, AnyEntry, AssemblyEntry } from '@/types';

const NotFound = lazy(() => import('@/views/NotFound'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks: Record<string, React.FC<ContentEntryProps<any>>> = {
    "profile": Profile,
    "section": Section,
    "article": Article,
    "imageContainer": ImageContainer,
    "product": Products,
    "imageBanner": ImageBanner
}

type ContentProps = {
    preview?: boolean
}
export const Content = (props: ContentProps): React.ReactElement => {
    const { preview } = props;

    let { type, slug, } = useParams();
    [type, slug] = [type || "assembly", slug || "home"];

    let contentType
    if (type === 'about') {
        contentType = 'profile'
    }
    else if (type === 'shop') {
        contentType = 'product'
    }
    else if (type === 'inspiration') {
        contentType = 'article'
    }
    else if (type === 'blog') {
        contentType = 'article'
    }
    else {
        contentType = type
    }

    const name = preview ? 'preview' : 'content';
    const res = useQuery([name, contentType, slug], fetchContent);
    if (res.data?.items.length === 0) {
        return <NotFound />
    }

    const entry = res.data?.items[0] as Entry<AnyEntry>

    return (
        <Box sx={{ my: 4 }}>
            <GridLayout contentEntry={entry} />
            <DefaultLayout contentEntry={entry} />
            <DetailedLayout contentEntry={entry} />
            {entry && <Contact />}
        </Box>
    )
}

const ContentBlock = (props: ContentEntryProps<AnyEntry>) => {
    const { contentEntry, detail } = props;

    const name = contentEntry?.sys.contentType.sys.id;
    if (!name) {
        return <></>
    }

    return blocks[name]({ contentEntry, detail })
}

const DetailedLayout = (props: ContentEntryProps<AnyEntry>) => {
    const { contentEntry } = props;

    const content = (contentEntry as Entry<AssemblyEntry>)

    return (
        <>
            {content?.sys.contentType.sys.id !== 'assembly' &&
                <LoadingState type={"Detailed"} contentEntry={contentEntry} >
                    <ContentBlock detail={true} contentEntry={contentEntry} />
                </LoadingState>
            }
        </>
    )
}

const DefaultLayout = (props: ContentEntryProps<AnyEntry>): React.ReactElement => {
    const { contentEntry } = props;

    const content = (contentEntry as Entry<AssemblyEntry>)

    return (
        <>
            {content?.sys.contentType.sys.id === 'assembly' && content?.fields.layout === 'Default' &&
                <LoadingState type={content?.fields.layout} contentEntry={content} >
                    {content.fields.references.map((block, index) =>
                        <Box key={index} sx={{ py: 4 }}>
                            <ContentBlock contentEntry={block} />
                        </Box>
                    )}
                </LoadingState>
            }
        </>
    )
}

const GridLayout = (props: ContentEntryProps<AnyEntry>): React.ReactElement => {
    const { contentEntry } = props;

    const content = (contentEntry as Entry<AssemblyEntry>)
    const initialCount = 12;
    const [limit, setLimit] = useState<number>(initialCount);
    const [disable, setDisable] = useState<boolean>(false);
    const { pathname } = useLocation();

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
    useQuery([limit, pathname], setLayout)

    return (
        <Container maxWidth={false}>
            {content?.sys?.contentType.sys.id === 'assembly' && content?.fields.layout === 'Grid' &&
                <Grid container spacing={{ xs: 2, xl: 6 }}>
                    {content.fields.references.slice(0, limit).map((block, index) =>
                        <Grid alignItems="stretch" key={index} xs={12} sm={6} md={4} xl={3} >
                            <LoadingState type={content?.fields.layout} contentEntry={contentEntry} >
                                <ContentBlock contentEntry={block} />
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
        </Container>
    )
}

export default Content