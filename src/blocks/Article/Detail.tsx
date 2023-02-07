import React, { useReducer, useState } from 'react';

import CheckCircle from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ReplyIcon from '@mui/icons-material/Reply';
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import gfm from 'remark-gfm';

import DateFormatter from "@/components/DateFormatter";
import { Time } from '@/components/DateFormatter';
import LoadingImage from '@/components/LoadingImage';
import Markdown from '@/components/Markdown';
import Trail from '@/components/Trail';
import { createSubmission } from '@/functions';
import type { ArticleType, ContentProps } from '@/types';


const Detail = (props: ContentProps<ArticleType>) => {
    const { contentEntry } = props;
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/about/${contentEntry.fields.author.fields.slug}`, { state: { data: 'about' } })
        ReactGA.event({
            category: 'About',
            action: `Read more about ${contentEntry.fields.headline}`,
            label: contentEntry.fields.headline
        });
    }

    return (
        <>
            <Trail current={contentEntry?.fields.headline} />
            {contentEntry &&
                <>
                    <Stack sx={{ my: 4 }} spacing={2} alignItems="center">
                        <Typography sx={{ my: 2, maxWidth: "md" }} variant="h1" align="center" >
                            {contentEntry.fields.headline}
                        </Typography>
                        <Stack
                            sx={{ my: 2 }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2} >
                            <Typography variant="body1"  >
                                <DateFormatter dateString={contentEntry.fields.date} />
                            </Typography>
                            <FiberManualRecordIcon sx={{ height: 2.5, width: 2.5 }} />
                            <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => handleClick()} variant="body1">
                                {contentEntry.fields.author.fields.name}
                            </Link>
                        </Stack>
                        <Box maxWidth={800} >
                            <LoadingImage
                                skeletonheight={500}
                                sx={{ width: '100%', height: 'auto', py: 4 }}
                                src={contentEntry?.fields.coverImage.fields.file.url}
                                alt={contentEntry.fields.coverImage.fields.title}
                            />
                        </Box>
                        <ReactMarkdown remarkPlugins={[gfm]} components={Markdown}>{contentEntry.fields.body}</ReactMarkdown>
                        <Comments contentEntry={contentEntry} />
                    </Stack>
                </>
            }
        </>
    )
}
export default Detail;


type State = {
    name: string;
    comment: string;
    date?: number;
}
type Action = {
    [key: string]: string;
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.value };
        case 'comment':
            return { ...state, comment: action.value };
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

type SingleCommentProps = {
    id: string;
    date: number;
    name: string;
    comment: string;
    commentId: string;
    replies: Replies[]
}

type ReplyInit = {
    name: string;
    reply: string;
}

type Replies = {
    name: string;
    reply: string;
    date: number;
    replyId: string;
}

type CommentsProps = {
    data: SingleCommentProps[]
}

const Comments = (props: ContentProps<ArticleType>) => {
    const { contentEntry } = props
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        comment: ''
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentsProps>();
    const [loading, setLoading] = useState<boolean>(true);

    const handleGet = async () => {
        const q = new URLSearchParams();
        q.append('searchText', contentEntry.sys.id);
        const url = `/.netlify/functions/comments?${q.toString()}`;
        const res = await fetch(url)
        const data = await res.json();
        if (res.status === 200) {
            setLoading(false);
            setComments(data)
        }
        return data;
    }
    useQuery([comments, contentEntry.sys.id], handleGet)

    const handleSubmit = () => {
        setSubmitting(true);
        const data = {
            name: state.name,
            comment: state.comment,
            id: contentEntry.sys.id,
            replies: []
        }
        const url = `/.netlify/functions/comments`;
        createSubmission({ url, data, setSubmitting, setSubmitted });
    }

    useQuery([comments, contentEntry.sys.id], handleGet, { enabled: submitted })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    }

    return (
        <Container maxWidth={false} sx={{ maxWidth: 800 }} >
            <Stack sx={{ mt: 10 }} spacing={2}>
                <Typography variant="h1">Comments {" "} {comments?.data?.length !== undefined && <Chip color="info" label={comments?.data?.length} />}</Typography>
                {!submitted ?
                    <Stack alignItems="flex-end" spacing={2}>
                        <TextField onChange={handleChange} label="Name" name="name" fullWidth />
                        <TextField onChange={handleChange} label="Comment" name="comment" multiline rows={4} fullWidth />
                        <LoadingButton
                            disabled={state.name === '' || state.comment === ''}
                            loading={submitting}
                            onClick={handleSubmit}
                            variant="contained"
                            size="large">Post comment...</LoadingButton>
                    </Stack>
                    :
                    <Stack alignItems="center" spacing={2}>
                        <CheckCircle sx={{ color: 'success.main' }} />
                        <Typography variant="subtitle2" >Comment posted successfully</Typography>
                    </Stack>
                }
                {loading ?
                    <CommentSkeleton />
                    :
                    <CommentThread comments={comments} handleGet={handleGet} />
                }
            </Stack>
        </Container >
    )
}

const CommentSkeleton = () => {
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
            <Container sx={{ mb: 1 }} maxWidth="md">
                <Skeleton variant="text" height={200} />
            </Container>
        </Stack>
    )
}

type CommentThreadProps = {
    comments?: CommentsProps;
    handleGet: () => void;
}

const CommentThread = (props: CommentThreadProps) => {
    const { comments, handleGet } = props;

    const init = {
        name: '',
        reply: ''
    }

    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyFields, setReplyFields] = useState<ReplyInit>(init);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const openReply = async (r: string) => {
        setReplyTo(r)
    }

    const replyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReplyFields({ ...replyFields, [name]: value })
    }

    const submitReply = async () => {
        setSubmitting(true);
        const data = {
            commentId: replyTo,
            replies: [
                {
                    name: replyFields.name,
                    reply: replyFields.reply
                }
            ]
        }
        const url = `/.netlify/functions/comments`;
        const method = 'PUT';
        createSubmission({ url, method, data, setSubmitting, setSubmitted });
    }

    useQuery([comments], handleGet, { enabled: submitted })

    return (
        <>
            {comments?.data?.map((item: SingleCommentProps, index: number) =>
                <Stack key={index} >
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between" >
                        <CommentInfo name={item.name} date={item?.date} />
                        {replyTo !== item.commentId ?
                            <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => openReply(item.commentId)}>
                                <ReplyIcon fontSize="small" /> Reply
                            </Link>
                            :
                            <Link color="error" underline="hover" sx={{ cursor: 'pointer' }} onClick={() => openReply("")}>
                                Cancel
                            </Link>
                        }
                    </Stack>
                    <Container sx={{ mb: 1 }} maxWidth="md">
                        <Typography sx={{ mt: 2 }} variant="body1">
                            {item.comment}
                        </Typography>
                        {item.replies?.map((r: Replies, index: number) =>
                            <Stack sx={{ py: 2 }} key={index} >
                                <CommentInfo name={r.name} date={r?.date} />
                                <Typography key={index} sx={{ mt: 2 }} variant="body1">
                                    {r.reply}
                                </Typography>
                            </Stack>
                        )}
                    </Container>
                    {!submitted ? replyTo === item.commentId &&
                        <Stack sx={{ p: 1 }} alignItems="flex-start" spacing={2}>
                            <TextField sx={{ width: 400 }} name="name" label="Name" onChange={replyChange} size="small" />
                            <TextField sx={{ width: 400 }} name="reply" label="Reply" onChange={replyChange} multiline rows={4} size="small" />
                            <LoadingButton
                                disabled={replyFields.name === '' || replyFields.reply === ''}
                                loading={submitting}
                                onClick={() => submitReply()}
                                variant="contained"
                                size="small">Reply </LoadingButton>
                        </Stack>
                        :
                        <Stack alignItems="center" spacing={2}>
                            <CheckCircle sx={{ color: 'success.main' }} />
                            <Typography variant="subtitle2" >Reply sent successfully</Typography>
                        </Stack>
                    }
                    <Divider />
                </Stack>
            )}
        </>
    )
}

type CommentInfoProps = {
    name: string;
    date: number;
}

const CommentInfo = (props: CommentInfoProps) => {
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