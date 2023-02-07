import React, { useState, useReducer, useEffect } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from "@tanstack/react-query";
import { Asset, Entry } from 'contentful';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';

import CartPopper from './CartPopper';
import { Time } from '@/components/DateFormatter';
import LoadingImage from '@/components/LoadingImage';
import { Markdown } from '@/components/Markdown';
import Notifier from '@/components/Notifier';
import Trail from '@/components/Trail';
import { imageSrc } from '@/functions';
import { createSubmission } from '@/functions';
import type { ProductTypes, ContentProps } from '@/types';
import { useCartContext } from "@/views/Cart/cartProvider";

const Detail = (props: ContentProps<ProductTypes>) => {
    const { contentEntry } = props;
    const { addToCart } = useCartContext();
    const [open, setOpen] = useState<boolean>(false);
    const [clickEvent, setClickEvent] = useState<boolean>(false);
    const [image, setImage] = useState<string>(contentEntry.fields.featureImage.fields.file.url);

    const handleCart = () => {
        setClickEvent(true);
        addToCart(contentEntry.fields.productId, '1', contentEntry.fields)
        ReactGA.event({
            category: 'Product Detail',
            action: `Add ${contentEntry.fields.name} to cart`,
            label: contentEntry.fields.name,
        });
    }

    const handleSetImage = (img: Asset) => {
        setImage(img.fields.file.url)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <Trail current={contentEntry.fields.name} />
            <Notifier open={contentEntry.fields.nzShippingOnly} message="This product is only available for shipping within New Zealand." />
            <Heading contentEntry={contentEntry} sx={{ display: { xs: 'flex', md: 'none' }, mt: 4 }} />
            <Grid sx={{ mt: 1 }} container spacing={2} >
                <Grid xs={12} md={6}  >
                    <Stack justifyContent="center" spacing={2} direction="row" >
                        <ThumbnailCarousel contentEntry={contentEntry} image={image} handleSetImage={handleSetImage} />
                        <CardActionArea sx={{ backgroundColor: 'gray.100' }} onClick={() => handleOpen()}>
                            <LoadingImage
                                skeletonheight={"90vh"}
                                sx={{ maxHeight: '90vh', width: '100%', objectFit: 'scale-down' }}
                                src={image}
                                alt={"Feature image"}
                            />
                        </CardActionArea>
                    </Stack>
                </Grid>
                <Grid xs={12} md={6} >
                    <Heading contentEntry={contentEntry} sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Stack sx={{ my: 2 }} alignItems="center">
                        <Button sx={{ mb: 2 }} size="large" disabled={!contentEntry.fields.inStock} onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant="contained">
                            {!contentEntry.fields.inStock ? "Sold out" : "Add to Cart"}
                        </Button>
                        <Reviews contentEntry={contentEntry} />
                    </Stack>
                    <Body contentEntry={contentEntry} />
                </Grid>
            </Grid >
            <CartPopper clickEvent={clickEvent} />
            <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>
                <img
                    style={{ height: '90vh', width: '100%' }}
                    loading="eager"
                    src={image}
                    alt={"Feature img"}
                />
            </Dialog>
        </>
    );
}
export default Detail;

type HeadingProps = {
    contentEntry: Entry<ProductTypes>;
    sx?: object;
}

const Heading = (props: HeadingProps) => {
    const { contentEntry, sx } = props;

    return (
        <Stack sx={{ ...sx }} alignItems="center" spacing={2}>
            <Typography variant="h2" align="center" sx={{ pt: 5 }}>
                {contentEntry.fields.name}
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                {contentEntry.fields.oldPrice &&
                    <Typography color="grayText" sx={{ textDecoration: 'line-through' }} variant="body1" >
                        ${contentEntry.fields.oldPrice.toFixed(2)}
                    </Typography>
                }
                <Stack spacing={1} direction="row" alignItems="flex-end">
                    <Typography variant="h4" >
                        ${contentEntry.fields.price.toFixed(2)}
                    </Typography>
                    <Typography >
                        NZD
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

const Body = (props: ContentProps<ProductTypes>) => {
    const { contentEntry } = props;

    const sentences = contentEntry.fields.description.split('.');
    const preview = sentences.slice(0, 2).join('.');
    const detect = sentences.join('.');

    const [hidden, setHidden] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<string>(preview);

    const handleShowMore = () => {
        setShowMore(contentEntry.fields.description)
    }

    const handleShowLess = () => {
        setShowMore(preview)
    }

    const detectLength = () => {
        if (detect.length === preview.length) {
            setHidden(true)
        }
        return detect.length === preview.length
    }
    useQuery([detect], detectLength)

    return (
        <Box >
            <ReactMarkdown components={Markdown} >
                {showMore === preview && !hidden ? `${showMore}...` : showMore}
            </ReactMarkdown>
            <Box sx={{ p: 2 }}>
                {!hidden && showMore === preview ?
                    <Link sx={{ cursor: 'pointer' }} onClick={handleShowMore} >
                        Read more
                    </Link>
                    :
                    <Link sx={{ cursor: 'pointer' }} onClick={handleShowLess} >
                        Read less
                    </Link>
                }
            </Box>
        </Box>
    )
}

type ThumbnailCarouselProps = {
    contentEntry: {
        fields: {
            productFiles: Asset[];
        };
    };
    image: string;
    handleSetImage: (img: Asset) => typeof img | void;
}

const ThumbnailCarousel = (props: ThumbnailCarouselProps) => {
    const { contentEntry, handleSetImage, image } = props;

    const initialCount = 6;
    const [offset, setOffset] = useState<number>(0);
    const [count, setCount] = useState<number>(initialCount);

    const handleThumbnailLess = () => {
        setOffset(offset - 1)
        setCount(count - 1)
    };

    const handleThumbnailMore = () => {
        setOffset(offset + 1)
        setCount(count + 1)
    };

    const carouselScroll = (index: number) => {
        if (index === 0 && offset === 0) {
            return
        } else if (index === 5 && count > contentEntry.fields.productFiles.length - 1) {
            return
        } else if (index === 0) {
            setOffset(offset - 1)
            setCount(count - 1)
        } else if (index === 5) {
            setOffset(offset + 1)
            setCount(count + 1)
        }
    }

    const handleImage = (img: Asset, index: number) => {
        handleSetImage(img)
        carouselScroll(index)
    }

    const buttonSize = { height: 40, width: 40 };

    return (
        <>
            {contentEntry.fields.productFiles &&
                <Stack spacing={1} direction="column" alignItems="center" >
                    {contentEntry.fields.productFiles.length > initialCount &&
                        <IconButton
                            disabled={offset === 0}
                            sx={buttonSize}
                            onClick={handleThumbnailLess}>
                            <KeyboardArrowUpIcon />
                        </IconButton>
                    }
                    {contentEntry.fields.productFiles.slice(offset, count).map((img: Asset, index: number) =>
                        <LoadingAvatar
                            key={img.sys.id}
                            src={img.fields.file.url}
                            image={image}
                            alt={img.fields.title}
                            onClick={() => handleImage(img, index)}
                        />
                    )}
                    {contentEntry.fields.productFiles.length > initialCount &&
                        <IconButton
                            disabled={count > contentEntry.fields.productFiles.length - 1}
                            sx={buttonSize}
                            onClick={handleThumbnailMore}>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    }
                </Stack>
            }
        </>
    )
}

type loadingAvatarProps = {
    src: string;
    onClick: () => void;
    image: string;
    alt: string;
}

const LoadingAvatar = (props: loadingAvatarProps) => {
    const { src, image } = props;

    const [load, setLoad] = useState<boolean>(true);
    const avatarSize = { width: 50, height: 80 };

    const loadSrc = () => imageSrc({ setLoad, src })
    useQuery([src, image,], loadSrc)

    return (
        <>
            {load ?
                <Skeleton sx={avatarSize} variant="rectangular" />
                :
                <Avatar
                    component={CardActionArea}
                    sx={image === src ? { border: 1, ...avatarSize } : avatarSize}
                    variant="square"
                    {...props}
                />
            }
        </>
    )
}

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
}

type Page = {
    data: Review[]
}

const starArr = [1, 2, 3, 4, 5];

const initialState = {
    name: '',
    review: '',
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

const Reviews = (props: ContentProps<ProductTypes>) => {
    const { contentEntry } = props;
    const [openReviews, setOpenReviews] = useState<boolean>(false);
    const [writeReview, setWriteReview] = useState<boolean>(false);
    const [starFilled, setStarFilled] = useState<number>(0);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<Page>();
    // const [averageRating, setAverageRating] = useState<number>(0);

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

    // const handleSet = React.useCallback(() => {
    //     if (reviews?.data?.length !== undefined) {
    //         const total = reviews?.data?.reduce((acc: number, review: Review) => acc + review.rating, 0)
    //         const average = total / reviews?.data?.length
    //         setAverageRating(average)
    //     }
    // }, [reviews])

    // useEffect(() => {
    //     handleSet()
    // }, [handleSet])

    const handleOpen = () => {
        setOpenReviews(true)
    }

    const handleSubmit = () => {
        setSubmitting(true);
        const data = {
            rating: starFilled,
            name: state.name,
            review: state.review,
            id: contentEntry.sys.id,
        }
        const url = `/.netlify/functions/reviews`;
        createSubmission({ url, data, setSubmitting, setSubmitted });
    }

    useEffect(() => {
        if (submitted) {
            setWriteReview(false);
        }
    }, [submitted])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value: value });
    }

    return (
        <Stack spacing={1} direction="row"  >
            <Link onClick={handleOpen} underline="hover" sx={{ cursor: 'pointer' }} variant="body1" >
                Read Reviews
            </Link>
            {/* <Stack spacing={1} direction="row" alignItems="center" justifyContent="center" >
                <StarIcon sx={{ color: "warning.light" }} />  <Typography>{reviews?.data && averageRating}</Typography>
            </Stack> */}
            <Dialog fullWidth open={openReviews} onClose={() => setOpenReviews(false)} >
                {!writeReview &&
                    <>
                        <DialogTitle >Reviews</DialogTitle>
                        {loading &&
                            <Box sx={{ p: 2 }}>
                                <CommentSkeleton />
                            </Box>
                        }
                        {!loading && reviews?.data?.length !== undefined && reviews?.data?.map((review: Review, index: number) =>
                            <Box key={index} sx={{ p: 2 }}>
                                <CommentInfo name={review.name} date={review.date} />
                                <Box sx={{ m: 2 }}>
                                    <Stack spacing={1} direction="row" alignItems="center" >
                                        {starArr.map((star: number) =>
                                            <div key={star} >
                                                {review.rating >= star ? <StarIcon sx={{ color: "warning.light" }} /> :
                                                    <StarBorderIcon sx={{ color: "warning.light" }} />
                                                }
                                            </div>
                                        )}
                                    </Stack>
                                    <Typography >{review.review}</Typography>
                                </Box>
                            </Box>
                        )}
                        {!loading && reviews?.data?.length === undefined &&
                            <Box sx={{ p: 2 }}>
                                <Typography >No reviews yet</Typography>
                            </Box>
                        }
                        <DialogActions>
                            <Button onClick={() => setWriteReview(true)} >Write a review</Button>
                        </DialogActions>

                    </>
                }
                {writeReview &&
                    <Box sx={{ p: 2 }}>
                        <Stack spacing={2}>
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
                            <DialogActions>
                                <LoadingButton loading={submitting} onClick={handleSubmit} variant="contained" >Send Review</LoadingButton>
                                <Button color="error" onClick={() => setWriteReview(false)} >Cancel</Button>
                            </DialogActions>
                        </Stack>
                    </Box>
                }
            </Dialog>
        </Stack>

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