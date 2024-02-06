import { JSX } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { Entry } from "contentful";
import { useNavigate, useParams } from "react-router-dom";

import { fetchContent } from "@/views/Content/api";

type ToggleStoryProps = {
    pageID: string;
};

type Response = {
    data: {
        items: Entry<{
            references: Entry<{
                headline: string;
                slug: string;
            }>[];
        }>[];
    };
};

const ToggleStory = (props: ToggleStoryProps): JSX.Element => {
    const { pageID } = props;
    const { type } = useParams();
    const navigate = useNavigate();
    const res = useQuery({
        queryKey: ["content", "assembly", type],
        queryFn: fetchContent,
    });

    const arr = (res as Response)?.data?.items[0]?.fields?.references;
    const currentPage = arr?.filter((item) => item.sys.id === pageID)[0];
    const index = arr?.indexOf(currentPage);

    const prevPage = arr?.[index + 1];
    const nextPage = arr?.[index - 1];

    const getHeadline = (page: { fields: { headline: string } }): string => {
        const { headline } = page?.fields || "";
        if (!headline) {
            return "No more stories";
        }
        if (headline.length > 25) {
            return `${headline.substring(0, 25)}...`;
        }
        return headline;
    };

    return (
        <Container sx={{ maxWidth: 800 }} maxWidth={false}>
            <Stack
                sx={{ mt: 2 }}
                direction="row"
                justifyContent="space-between">
                <Button
                    disabled={nextPage === undefined}
                    startIcon={<ChevronLeftIcon />}
                    onClick={() =>
                        navigate(`/${type}/${nextPage?.fields?.slug}`)
                    }>
                    {getHeadline(nextPage)}
                </Button>
                <Button
                    disabled={prevPage === undefined}
                    endIcon={<ChevronRightIcon />}
                    onClick={() =>
                        navigate(`/${type}/${prevPage?.fields?.slug}`)
                    }>
                    {getHeadline(prevPage)}
                </Button>
            </Stack>
        </Container>
    );
};
export default ToggleStory;
