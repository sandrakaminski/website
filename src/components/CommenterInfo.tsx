import React from 'react';

import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Time } from './DateFormatter';

type CommenterInfoProps = {
    name: string;
    date: number;
}

const CommenterInfo = (props: CommenterInfoProps) => {
    const { name, date } = props;

    return (
        <Stack direction="row" alignItems="center" spacing={2} >
            <Avatar />
            <Typography variant="subtitle1">
                {name}
            </Typography>
            <Typography sx={{ pt: 0.25 }} >
                <Time date={date} />
            </Typography>
        </Stack>
    )
}
export default CommenterInfo;

export const CommentSkeleton = () => {
    return (
        <Stack>
            <Stack direction="row" alignItems="center" spacing={2} >
                <Avatar />
                <Typography variant="subtitle1">
                    <Skeleton width={150} variant="text" />
                </Typography>
                <Typography sx={{ pt: 0.25 }} >
                    <Skeleton width={100} variant="text" />
                </Typography>
            </Stack>
            <Container maxWidth="md">
                <Skeleton height={200} />
            </Container>
        </Stack>
    )
}