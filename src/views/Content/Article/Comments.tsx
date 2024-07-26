import React, {
    useReducer,
    useState,
    JSX,
    useEffect } from "react";

import CheckCircle from "@mui/icons-material/CheckCircle";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import CommenterInfo, { CommentSkeleton } from "@/components/CommenterInfo";
import ToggleStory from "@/components/ToggleStory";
import { useCreateSubmission, useFetchEntries } from "@/hooks";
import type { ArticleType, ContentEntryProps } from "@/types";

type State = {
    name: string;
    comment: string;
    date?: number;
};
type Action = {
    [key: string]: string;
};

const url = `/.netlify/functions/comments`;

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "name":
            return { ...state, name: action.value };
        case "comment":
            return { ...state, comment: action.value };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

type SingleComment = {
    id: string;
    date: number;
    name: string;
    comment: string;
    commentId: string;
    replies: Replies[];
};

type Replies = {
    name: string;
    reply: string;
    date: number;
    replyId: string;
};

type CommentsProps = {
    data: SingleComment[];
};

const Comments = (props: ContentEntryProps<ArticleType>): JSX.Element => {
    const { contentEntry } = props;

    const { type } = useParams();
    const [state, dispatch] = useReducer(reducer, {
        name: "",
        comment: "",
    });

    const { loading, error, response, handleGet, rerender } =
        useFetchEntries<CommentsProps>(contentEntry.sys.id, url);

    const data = {
        page: `${type}/${contentEntry.fields.slug}`,
        name: state.name,
        comment: state.comment,
        id: contentEntry?.sys?.id,
        replies: [],
    };

    const { submitting, submitted, createSubmission } = useCreateSubmission({
        url,
        data,
    });

    useEffect(() => {
        handleGet();
    }, [
        contentEntry.sys.id,
        handleGet,
        submitted,
        contentEntry.fields.slug,
        response,
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    };

    return (
        <Container maxWidth={false} sx={{ maxWidth: 800 }}>
            <Stack sx={{ mt: 10 }} spacing={2}>
                <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography variant="h1">Comments</Typography>
                    {response?.data?.length && (
                        <Chip
                            size="small"
                            color="info"
                            label={response?.data?.length}
                        />
                    )}
                </Stack>
                {!submitted ? (
                    <Stack alignItems="flex-end" spacing={2}>
                        <TextField
                            onChange={handleChange}
                            label="Name"
                            name="name"
                            fullWidth
                        />
                        <TextField
                            onChange={handleChange}
                            label="Comment"
                            name="comment"
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <LoadingButton
                            disabled={state.name === "" || state.comment === ""}
                            loading={submitting}
                            onClick={createSubmission}
                            variant="contained"
                            size="large">
                            Post comment...
                        </LoadingButton>
                    </Stack>
                ) : (
                    <Stack alignItems="center" spacing={2}>
                        <CheckCircle sx={{ color: "success.main" }} />
                        <Typography variant="subtitle2">
                            Comment posted successfully
                        </Typography>
                    </Stack>
                )}
                {loading && <CommentSkeleton />}
                {!loading && response && <CommentThread comments={response} />}
                {error.state && (
                    <Typography color="error" variant="subtitle1">
                        {error.message}
                    </Typography>
                )}
            </Stack>
            <ToggleStory next={() => rerender()} pageID={contentEntry.sys.id} />
        </Container>
    );
};

type CommentThreadProps = {
    comments?: CommentsProps;
};

const CommentThread = (props: CommentThreadProps): JSX.Element => {
    const { comments } = props;

    const init = {
        name: "",
        reply: "",
    };

    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyFields, setReplyFields] = useState<{ [key: string]: string }>(
        init
    );

    const replyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReplyFields({ ...replyFields, [name]: value });
    };
    const data = {
        commentId: replyTo,
        replies: [
            {
                name: replyFields.name,
                reply: replyFields.reply,
            },
        ],
    };

    const method = "PUT";
    const { submitting, error, submitted, createSubmission } =
        useCreateSubmission({
            url,
            method,
            data,
        });

    return (
        <>
            {comments?.data?.map((item, index) => (
                <Stack key={index}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        justifyContent="space-between">
                        <CommenterInfo name={item.name} date={item?.date} />
                        {replyTo !== item.commentId ? (
                            <Link
                                underline="hover"
                                sx={{ cursor: "pointer" }}
                                onClick={() => setReplyTo(item.commentId)}>
                                Reply
                            </Link>
                        ) : (
                            <Link
                                color="error"
                                underline="hover"
                                sx={{ cursor: "pointer" }}
                                onClick={() => setReplyTo("")}>
                                Cancel
                            </Link>
                        )}
                    </Stack>
                    <Container sx={{ mb: 1 }} maxWidth="md">
                        <Typography sx={{ mt: 2 }} variant="body1">
                            {item.comment}
                        </Typography>
                        {item.replies?.map((r, index) => (
                            <Stack sx={{ py: 2 }} key={index}>
                                <CommenterInfo name={r.name} date={r?.date} />
                                <Typography
                                    key={index}
                                    sx={{ mt: 2, ml: 4 }}
                                    variant="body1">
                                    {r.reply}
                                </Typography>
                            </Stack>
                        ))}
                        {!submitted ? (
                            replyTo === item.commentId && (
                                <Stack
                                    sx={{ p: 1, ml: 2 }}
                                    alignItems="flex-start"
                                    spacing={2}>
                                    <TextField
                                        sx={{ width: 400 }}
                                        name="name"
                                        label="Name"
                                        onChange={replyChange}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{ width: 400 }}
                                        name="reply"
                                        label="Reply"
                                        onChange={replyChange}
                                        multiline
                                        rows={4}
                                        size="small"
                                    />
                                    <LoadingButton
                                        disabled={
                                            replyFields.name === "" ||
                                            replyFields.reply === ""
                                        }
                                        loading={submitting}
                                        onClick={() => createSubmission()}
                                        variant="contained"
                                        size="small">
                                        Reply{" "}
                                    </LoadingButton>
                                </Stack>
                            )
                        ) : (
                            <Stack alignItems="center" spacing={2}>
                                <CheckCircle sx={{ color: "success.main" }} />
                                <Typography variant="subtitle2">
                                    Reply sent successfully
                                </Typography>
                            </Stack>
                        )}
                        {error.state && (
                            <Typography color="error">
                                {error.message}
                            </Typography>
                        )}
                    </Container>
                    <Divider />
                </Stack>
            ))}
        </>
    );
};

export default Comments;
