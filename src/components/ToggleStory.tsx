import React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchContent } from '@/views/Content/api';

type ToggleStoryProps = {
    pageID: string;
}

// TODO - remove any's
const ToggleStory = (props: ToggleStoryProps) => {
    const { pageID } = props
    const { type } = useParams();
    const navigate = useNavigate();
    const res: any = useQuery(['content', "assembly", type], fetchContent);
    const arr: any = res.data?.items[0]?.fields?.references; 
    const currntPage: any = arr?.filter((item: any) => item.sys.id === pageID)[0]; 
    const index = arr?.indexOf(currntPage); 

    const prevPage = arr?.[index + 1]; 
    const nextPage = arr?.[index - 1]; 

    const getPrev = () => {
        navigate(`/${type}/${prevPage?.fields?.slug}`);
    }; 

    const getNext = () => {
        navigate(`/${type}/${nextPage?.fields?.slug}`);
    }; 

    return (
        <Container sx={{ maxWidth: 800 }} maxWidth={false}>
            <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between">
                <Button disabled={nextPage === undefined} startIcon={<ChevronLeftIcon />} onClick={() => getNext()} >{nextPage === undefined ? "No more stories" : nextPage?.fields?.headline}</Button>
                <Button disabled={prevPage === undefined} endIcon={<ChevronRightIcon />} onClick={() => getPrev()} >{prevPage === undefined ? "No more stories" : prevPage?.fields?.headline}</Button>
            </Stack>
        </Container>

    );
};
export default ToggleStory;