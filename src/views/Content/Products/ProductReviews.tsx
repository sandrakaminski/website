import React, { useState, useReducer, useEffect } from 'react';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from "@tanstack/react-query";

import CommenterInfo, { CommentSkeleton } from '@/components/CommenterInfo';
import MediaUploader from '@/components/MediaUploader';
import { createSubmission } from '@/functions';
import type { ProductTypes, ContentEntryProps } from '@/types';

type State = {
    name: string;
    review: string;
}
type Action = {
    [key: string]: string;
}

type Review = {
    name: string;
    review: string;
    rating: number;
    date: number;
    media: string
}

type Page = {
    data: Review[]
}

const starArr = [1, 2, 3, 4, 5];

const initialState = {
    name: '',
    review: ''
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.value };
        case 'review':
            return { ...state, review: action.value };
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const ProductReviews = (props: ContentEntryProps<ProductTypes>) => {
    const { contentEntry } = props;
    const [openReviews, setOpenReviews] = useState<boolean>(false);
    const [writeReview, setWriteReview] = useState<boolean>(false);
    const [starFilled, setStarFilled] = useState<number>(0);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<Page>();
    const [fields, setFields] = useState<Action>({
        media: "",
        title: ""
    });
    const [fullImg, setFullImg] = useState<string>("");

    const setRating = (rating: number) => {
        setStarFilled(rating)
    }

    const handleGet = async () => {
        const q = new URLSearchParams();
        q.append('searchText', contentEntry.sys.id);
        const url = `/.netlify/functions/reviews?${q.toString()}`;
        const res = await fetch(url)
        const data = await res.json();
        if (res.status === 200) {
            setLoading(false);
            setReviews(data)
        }
        return data;
    }
    useQuery([reviews, contentEntry.sys.id], handleGet, { enabled: true })

    const handleOpen = () => {
        setOpenReviews(true)
    }

    const handleFullImg = (img: string) => {
        setFullImg(img)
    }


    const handleSubmit = () => {
        setSubmitting(true);
        const data = {
            rating: starFilled,
            name: state.name,
            review: state.review,
            id: contentEntry.sys.id,
            media: fields.media
        }
        const url = `/.netlify/functions/reviews`;
        createSubmission({ url, data, setSubmitting, setSubmitted });
    }

    useEffect(() => {
        if (submitted) {
            setWriteReview(false);
        }
    }, [submitted])

    useQuery([reviews, contentEntry.sys.id], handleGet, {
        enabled: submitted
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    }

    const convertBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const handleFileRead = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target
        const img = e.target.files?.[0] as Blob

        const base64 = await convertBase64(img);
        setFields((prev) => {
            prev[name] = base64 as string
            prev["title"] = img.name as string
            return { ...prev };
        });
    };

    return (
        <Stack spacing={1} direction="row">
            <Link onClick={handleOpen} underline="hover" sx={{ cursor: 'pointer' }} variant="body1">
                Read Reviews
            </Link>
            <Dialog fullWidth maxWidth={fullImg !== "" ? "xl" : "sm"} open={openReviews} onClose={() => setOpenReviews(false)} >
                {!fullImg && <DialogTitle >{!writeReview ? "Reviews" : "Write a review"}</DialogTitle>}
                {!fullImg ? !writeReview &&
                    <DialogContent>
                        {loading &&
                            <CommentSkeleton />
                        }
                        {!loading && reviews?.data?.length !== undefined && reviews?.data?.map((review: Review, index: number) =>
                            <Box sx={{ my: 2 }} key={index} >
                                <CommenterInfo name={review.name} date={review.date} />
                                <Stack sx={{ mt: 2 }} spacing={1} direction="row" alignItems="center" >
                                    {starArr.map((star: number) =>
                                        <div key={star} >
                                            {review.rating >= star ? <StarIcon sx={{ color: "warning.light" }} /> :
                                                <StarBorderIcon sx={{ color: "warning.light" }} />
                                            }
                                        </div>
                                    )}
                                </Stack>
                                <Typography>{review.review}</Typography>
                                {review.media !== "" && <Avatar component={Button} onClick={() => handleFullImg(review.media)} src={review.media} sx={{ width: 100, height: 100 }} variant="square" />}
                                <Divider />
                            </Box>
                        )}
                        {!loading && reviews?.data?.length === undefined &&
                            <Typography >No reviews yet</Typography>
                        }
                    </DialogContent>
                    :
                    <img width="auto" style={{ maxHeight: 600 }} src={fullImg} alt="full" />
                }
                {writeReview &&
                    <Stack spacing={2} component={DialogContent}  >
                        <Stack direction="row" alignItems="center">
                            <Typography variant="subtitle2" >Rating</Typography>
                            {starArr.map((star: number) =>
                                <IconButton onClick={() => setRating(star)} key={star} >
                                    {starFilled >= star ? <StarIcon sx={{ color: "warning.light" }} /> :
                                        <StarBorderIcon sx={{ color: "warning.light" }} />
                                    }
                                </IconButton>
                            )}
                        </Stack>
                        <TextField name="name" onChange={handleChange} label="Full Name" />
                        <TextField name="review" onChange={handleChange} label="Review" multiline rows={4} />
                        <MediaUploader name={'media'} onChange={handleFileRead} title={fields.media ? "Change file" : "Upload media"} />
                        {fields.media &&
                            <>
                                <Avatar src={fields.media} sx={{ width: 100, height: 100 }} variant="square" />
                                {fields.title}
                            </>
                        }
                    </Stack>
                }
                <DialogActions>
                    {!writeReview ?
                        <Button onClick={() => setWriteReview(true)} >Write a review</Button>
                        :
                        <>
                            <LoadingButton loading={submitting} disabled={state.review === "" || state.name === "" || starFilled === 0} onClick={handleSubmit} variant="contained" >Send Review</LoadingButton>
                            <Button color="error" onClick={() => setWriteReview(false)} >Cancel</Button>
                        </>
                    }
                    {fullImg &&
                        <Button startIcon={<KeyboardReturnIcon />} onClick={() => setFullImg("")}  >Back</Button>
                    }
                </DialogActions>
            </Dialog>
        </Stack >
    )
}
export default ProductReviews