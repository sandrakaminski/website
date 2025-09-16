import React, { useState, useReducer, useEffect, JSX } from "react";

import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

import CommenterInfo, { CommentSkeleton } from "@/components/CommenterInfo";
import MediaUploader from "@/components/MediaUploader";
import { useCreateSubmission, useFetchEntries } from "@/hooks";
import type { ProductTypes, ContentEntryProps } from "@/types";

type State = {
    name: string;
    review: string;
};

type Review = {
    name: string;
    review: string;
    rating: number;
    date: number;
    media: string;
};

type Page = {
    data: Review[];
};

const starArr = [1, 2, 3, 4, 5];

const initialState = {
    name: "",
    review: "",
};

const reducer = (state: State, action: { [key: string]: string }): State => {
    switch (action.type) {
        case "name":
            return { ...state, name: action.value };
        case "review":
            return { ...state, review: action.value };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const ProductReviews = (
    props: ContentEntryProps<ProductTypes>
): JSX.Element => {
    const { contentEntry } = props;
    const [writeReview, setWriteReview] = useState<boolean>(false);
    const [starFilled, setStarFilled] = useState<number>(0);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [fields, setFields] = useState<{ [key: string]: string }>({
        media: "",
        title: "",
    });
    const [fullImg, setFullImg] = useState<string>("");
    const reviewsUrl = `/.netlify/functions/reviews`;

    const setRating = (rating: number) => {
        if (starFilled === rating) {
            setStarFilled(0);
            return;
        }
        setStarFilled(rating);
    };

    const { loading, error, response, handleGet } = useFetchEntries<Page>(
        contentEntry?.sys?.id,
        reviewsUrl
    );

    useEffect(() => {
        handleGet();
    }, [handleGet]);

    const handleFullImg = (img: string): void => {
        setFullImg(img);
    };

    const data = {
        rating: starFilled,
        name: state.name,
        review: state.review,
        id: contentEntry?.sys?.id,
        media: fields.media,
    };

    const { submitting, submitted, createSubmission } = useCreateSubmission(
        reviewsUrl,
        data
    );

    useEffect(() => {
        if (submitted) {
            setWriteReview(false);
        }
    }, [submitted]);

    useQuery({
        queryKey: [response],
        queryFn: handleGet,
        enabled: submitted,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    };

    const convertBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileRead = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const img = e.target.files?.[0] as Blob;

        const base64 = await convertBase64(img);
        setFields((prev) => {
            prev[name] = base64 as string;
            prev["title"] = "file";
            return { ...prev };
        });
    };

    return (
        <Stack sx={{ width: "100%", overflowY: "auto" }} spacing={2}>
            {!fullImg && (
                <Typography variant="h4">
                    {!writeReview ? "Reviews" : "Write a review"}
                </Typography>
            )}

            {!fullImg ? (
                !writeReview && (
                    <>
                        {error.state ? (
                            <Typography color="error">
                                {error.message}
                            </Typography>
                        ) : loading ? (
                            <CommentSkeleton />
                        ) : (
                            response?.data?.length !== undefined &&
                            response?.data?.map(
                                (review: Review, index: number) => (
                                    <Box sx={{ my: 2 }} key={index}>
                                        <CommenterInfo
                                            name={review.name}
                                            date={review.date}
                                        />
                                        <Stack
                                            sx={{ mt: 2 }}
                                            spacing={1}
                                            direction="row"
                                            alignItems="center">
                                            {starArr.map((star) => (
                                                <div key={star}>
                                                    {review.rating >= star ? (
                                                        <StarIcon
                                                            sx={{
                                                                color: "warning.light",
                                                            }}
                                                        />
                                                    ) : (
                                                        <StarBorderIcon
                                                            sx={{
                                                                color: "warning.light",
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </Stack>
                                        <Typography>{review.review}</Typography>
                                        {review.media !== "" && (
                                            <Avatar
                                                component={Button}
                                                onClick={() =>
                                                    handleFullImg(review.media)
                                                }
                                                src={review.media}
                                                variant="square"
                                            />
                                        )}
                                        <Divider />
                                    </Box>
                                )
                            )
                        )}
                        {!error.state &&
                            !loading &&
                            response?.data?.length === undefined && (
                                <Typography>No reviews yet</Typography>
                            )}
                    </>
                )
            ) : (
                <img
                    width="auto"
                    style={{ maxHeight: 600 }}
                    src={fullImg}
                    alt="full"
                />
            )}
            {writeReview && (
                <>
                    <Typography variant="subtitle2">Rating</Typography>
                    <Stack direction="row" alignItems="center">
                        {starArr.map((star: number) => (
                            <IconButton
                                onClick={() => setRating(star)}
                                key={star}>
                                {starFilled >= star ? (
                                    <StarIcon sx={{ color: "warning.light" }} />
                                ) : (
                                    <StarBorderIcon
                                        sx={{ color: "warning.light" }}
                                    />
                                )}
                            </IconButton>
                        ))}
                    </Stack>
                    <TextField
                        name="name"
                        onChange={handleChange}
                        label="Full Name"
                    />
                    <TextField
                        name="review"
                        onChange={handleChange}
                        label="Review"
                        multiline
                        rows={4}
                    />
                    <MediaUploader
                        name={"media"}
                        onChange={handleFileRead}
                        title={fields.media ? "Change file" : "Upload media"}
                    />
                    {fields.media && (
                        <>
                            <Avatar
                                src={fields.media}
                                sx={{ width: 100, height: 100 }}
                                variant="square"
                            />
                            {fields.title}
                        </>
                    )}
                </>
            )}
            <Stack spacing={1} direction="row" alignItems="center">
                {!writeReview ? (
                    <Button
                        endIcon={<EditIcon />}
                        onClick={() => setWriteReview(true)}>
                        Write a review
                    </Button>
                ) : (
                    <>
                        <LoadingButton
                            loading={submitting}
                            disabled={
                                state.review === "" ||
                                state.name === "" ||
                                starFilled === 0
                            }
                            onClick={createSubmission}
                            variant="contained">
                            Send Review
                        </LoadingButton>
                        <Button
                            color="error"
                            onClick={() => setWriteReview(false)}>
                            Cancel
                        </Button>
                    </>
                )}
            </Stack>
            {fullImg && (
                <Button
                    startIcon={<KeyboardReturnIcon />}
                    onClick={() => setFullImg("")}>
                    Back
                </Button>
            )}
        </Stack>
    );
};
export default ProductReviews;
