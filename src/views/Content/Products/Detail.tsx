import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from "@tanstack/react-query";
import { Asset, Entry } from 'contentful';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';

import CartPopper from './CartPopper';
import ProductReviews from './ProductReviews';
import LoadingImage from '@/components/LoadingImage';
import Notifier from '@/components/Notifier';
import Trail from '@/components/Trail';
import { imageSrc } from '@/functions';
import type { ProductTypes, ContentEntryProps } from '@/types';
import { useCartContext } from "@/views/Cart/cartProvider";

const Detail = (props: ContentEntryProps<ProductTypes>) => {
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
                                id="featureImage"
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
                        <Button id="addToCart" sx={{ mb: 2 }} size="large" disabled={!contentEntry.fields.inStock} onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant="contained">
                            {!contentEntry.fields.inStock ? "Sold out" : "Add to Cart"}
                        </Button>
                        <ProductReviews contentEntry={contentEntry} />
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
            <Typography id="productName" variant="h2" align="center" sx={{ pt: 5 }}>
                {contentEntry.fields.name}
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                {contentEntry.fields.oldPrice &&
                    <Typography id="oldPrice" color="grayText" sx={{ textDecoration: 'line-through' }} variant="body1" >
                        ${contentEntry.fields.oldPrice.toFixed(2)}
                    </Typography>
                }
                <Stack id="price" spacing={1} direction="row" alignItems="flex-end">
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

const Body = (props: ContentEntryProps<ProductTypes>) => {
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
    useQuery([detect.length === preview.length], detectLength)

    const formatMd = (text: string) => {
        return <ReactMarkdown>{text}</ReactMarkdown>
    }

    return (
        <>
            <Box id="description" >
                {formatMd(showMore === preview && !hidden ? `${showMore}...` : showMore)}
            </Box>
            {!hidden && showMore === preview ?
                <Link sx={{ cursor: 'pointer' }} onClick={handleShowMore} >
                    Read more
                </Link>
                :
                <Link sx={{ cursor: 'pointer' }} onClick={handleShowLess} >
                    Read less
                </Link>
            }
        </>
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
                            id="productFiles"
                            key={index}
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
    id: string
}

const LoadingAvatar = (props: loadingAvatarProps) => {
    const { src, image } = props;

    const [load, setLoad] = useState<boolean>(true);
    const avatarSize = { width: 50, height: 80 };

    const loadSrc = () => {
        imageSrc({ setLoad, src })
        return src
    }
    useQuery([src, image], loadSrc)

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