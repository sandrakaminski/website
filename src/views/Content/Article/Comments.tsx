import React, { useReducer, useState } from 'react';

import CheckCircle from '@mui/icons-material/CheckCircle';
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import {  useParams } from 'react-router-dom';

import CommenterInfo, { CommentSkeleton } from '@/components/CommenterInfo';
import { createSubmission } from '@/functions';
import type { ArticleType, ContentEntryProps } from '@/types';

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

const Comments = (props: ContentEntryProps<ArticleType>) => {
    const { contentEntry } = props;

    const { type } = useParams();
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
            page: `${type}/${contentEntry.fields.slug}`,
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
                <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography variant="h1">Comments  </Typography>{comments?.data?.length !== undefined && <Chip size="small" color="info" label={comments?.data?.length} />}
                </Stack>
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
                        <CommenterInfo name={item.name} date={item?.date} />
                        {replyTo !== item.commentId ?
                            <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => openReply(item.commentId)}>
                                Reply
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
                                <CommenterInfo name={r.name} date={r?.date} />
                                <Typography key={index} sx={{ mt: 2, ml: 4 }} variant="body1">
                                    {r.reply}
                                </Typography>
                            </Stack>
                        )}
                        {!submitted ? replyTo === item.commentId &&
                            <Stack sx={{ p: 1, ml: 2 }} alignItems="flex-start" spacing={2}>
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
                                <Typography variant="subtitle2">Reply sent successfully</Typography>
                            </Stack>
                        }
                    </Container>
                    <Divider />
                </Stack>
            )}
        </>
    )
}

export default Comments;