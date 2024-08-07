import React, { lazy, useState, JSX } from "react";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { Entry } from "contentful";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { fetchContent } from "./api";
import Article from "./Article";
import Contact from "./Contact";
import ImageBanner from "./ImageBanner";
import ImageContainer from "./ImageContainer";
import Products from "./Products";
import Profile from "./Profile";
import Section from "./Section";
import LoadingState from "@/components/Outline";
import { ContentEntryProps, AnyEntry, AssemblyEntry } from "@/types";

const NotFound = lazy(() => import("@/views/NotFound"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks: Record<string, React.FC<ContentEntryProps<any>>> = {
    profile: Profile,
    section: Section,
    article: Article,
    imageContainer: ImageContainer,
    product: Products,
    imageBanner: ImageBanner,
};

type ContentProps = {
    preview?: boolean;
};
export const Content = (props: ContentProps): JSX.Element => {
    const { preview } = props;

    let { type, slug } = useParams();
    [type, slug] = [type || "assembly", slug || "home"];

    let contentType;

    switch (type) {
        case "about":
            contentType = "profile";
            break;
        case "shop":
            contentType = "product";
            break;
        case "inspiration":
            contentType = "article";
            break;
        case "blog":
            contentType = "article";
            break;
        default:
            contentType = type;
    }

    const name = preview ? "preview" : "content";
    const res = useQuery({
        queryKey: [name, contentType, slug],
        queryFn: fetchContent,
    });
    if (res.data?.items.length === 0) {
        return <NotFound />;
    }

    const entry = res.data?.items[0] as Entry<AnyEntry>;

    return (
        <Box sx={{ my: 4 }}>
            <GridLayout contentEntry={entry} />
            <DefaultLayout contentEntry={entry} />
            <DetailedLayout contentEntry={entry} />
            {entry && <Contact />}
        </Box>
    );
};

const ContentBlock = (props: ContentEntryProps<AnyEntry>) => {
    const { contentEntry, detail } = props;

    const name = contentEntry?.sys.contentType.sys.id;
    if (!name) {
        return <></>;
    }

    return blocks[name]({ contentEntry, detail });
};

const DetailedLayout = (props: ContentEntryProps<AnyEntry>) => {
    const { contentEntry } = props;

    const content = contentEntry as Entry<AssemblyEntry>;

    return (
        <>
            {content?.sys.contentType.sys.id !== "assembly" && (
                <LoadingState type="Detailed" contentEntry={contentEntry}>
                    <ContentBlock detail={true} contentEntry={contentEntry} />
                </LoadingState>
            )}
        </>
    );
};

const DefaultLayout = (props: ContentEntryProps<AnyEntry>): JSX.Element => {
    const { contentEntry } = props;

    const content = contentEntry as Entry<AssemblyEntry>;

    return (
        <>
            {content?.sys.contentType.sys.id === "assembly" &&
                content?.fields.layout === "Default" && (
                    <LoadingState
                        type={content?.fields.layout}
                        contentEntry={content}>
                        {content.fields.references.map((block, index) => (
                            <Box key={index} sx={{ py: 4 }}>
                                <ContentBlock contentEntry={block} />
                            </Box>
                        ))}
                    </LoadingState>
                )}
        </>
    );
};

const GridLayout = (props: ContentEntryProps<AnyEntry>): JSX.Element => {
    const { contentEntry } = props;

    const content = contentEntry as Entry<AssemblyEntry>;
    const initialCount = 12;
    const [limit, setLimit] = useState<number>(initialCount);
    const [disable, setDisable] = useState<boolean>(false);
    const { pathname } = useLocation();

    const limitPage = () => {
        setLimit(limit + initialCount);
    };

    const displayCount = (): string => {
        const maxLimit =
            limit > content?.fields.references?.length
                ? content?.fields.references?.length
                : limit;
        const total = content?.fields.references?.length;

        return `${maxLimit} of ${total}`;
    };

    const setLayout = (): number => {
        if (
            limit > content?.fields.references?.length ||
            limit === content?.fields.references?.length
        ) {
            setDisable(true);
        } else {
            setDisable(false);
        }
        return limit;
    };
    useQuery({ queryKey: [limit, pathname], queryFn: setLayout });

    return (
        <Container maxWidth={false}>
            {content?.sys?.contentType.sys.id === "assembly" && (
                <>
                    {content?.fields.layout === "Grid" && (
                        <Grid container spacing={{ xs: 2, xl: 6 }}>
                            {content.fields.references
                                .slice(0, limit)
                                .map((block, index) => (
                                    <Grid
                                        alignItems="stretch"
                                        key={index}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        xl={3}>
                                        <LoadingState
                                            type={content?.fields.layout}
                                            contentEntry={content}>
                                            <ContentBlock
                                                contentEntry={block}
                                            />
                                        </LoadingState>
                                    </Grid>
                                ))}
                            {content?.fields.references?.length >
                                initialCount && (
                                <Grid
                                    xs={12}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    container
                                    sx={{ mt: 2 }}>
                                    <Stack
                                        justifyContent="center"
                                        alignItems="center">
                                        <Button
                                            disabled={disable}
                                            onClick={limitPage}>
                                            Show more
                                        </Button>
                                        <HorizontalRuleIcon color="disabled" />
                                        <Typography color="grayText">
                                            {displayCount()}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            )}
                        </Grid>
                    )}
                </>
            )}
        </Container>
    );
};

export default Content;
