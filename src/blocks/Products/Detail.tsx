import { useEffect, useState } from 'react';

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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';

import CartPopper from './CartPopper';
import type { ProductTypes } from './ProductTypes';
import Notifier from '@/components/Notifier';
import Trail from '@/components/Trail';
import { Markdown, Image } from '@/shared';
import { useCartContext } from "@/views/Cart/cartProvider";

const Detail = (props: ProductTypes) => {
    const { content } = props;
    const { addToCart } = useCartContext();

    const [open, setOpen] = useState<boolean>(false);
    const [clickEvent, setClickEvent] = useState<boolean>(false);
    const [image, setImage] = useState<string>(content.fields.featureImage.fields.file.url);

    const handleCart = () => {
        setClickEvent(true);
        addToCart(content.fields.productId, '1', content.fields)
        ReactGA.event({
            category: 'Product Detail',
            action: `Add ${content.fields.name} to cart`,
            label: content.fields.name,
        });
    }

    const handleSetImage = (img: Image) => {
        setImage(img.fields.file.url)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <Trail current={content.fields.name} />
            <Notifier open={content.fields.nzShippingOnly} message="This product is only available for shipping within New Zealand." />
            <Heading content={content} sx={{ display: { xs: 'flex', md: 'none' }, mt: 4 }} />
            <Grid sx={{ mt: 1 }} container spacing={2} >
                <Grid xs={12} md={6}  >
                    <Stack justifyContent="center" spacing={2} direction="row" >
                        <ThumbnailCarousel content={content} image={image} handleSetImage={handleSetImage} />
                        {content.fields.featureImage &&
                            <CardActionArea sx={{ backgroundColor: 'gray.100' }} onClick={() => handleOpen()}>
                                <img
                                    style={{ maxHeight: '90vh', width: '100%', objectFit: 'scale-down' }}
                                    loading="eager"
                                    src={image}
                                    alt={"Feature image"}
                                />
                            </CardActionArea>
                        }
                    </Stack>
                </Grid>
                <Grid xs={12} md={6} >
                    <Heading content={content} sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Stack sx={{ my: 2 }} alignItems="center">
                        <Button size="large" disabled={!content.fields.inStock} onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant="contained">
                            {!content.fields.inStock ? "Sold out" : "Add to Cart"}
                        </Button>
                    </Stack>
                    <Body content={content} />
                </Grid>
            </Grid >
            <CartPopper clickEvent={clickEvent} />
            <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>
                <img
                    style={{ height: '90vh', width: '100%' }}
                    loading="eager"
                    src={image}
                    alt={"Feature image"}
                />
            </Dialog>
        </>
    );
}
export default Detail;

const Heading = (props: any) => {
    const { content, sx } = props;

    return (
        <Stack sx={{ mb: 4, ...sx }} alignItems="center" spacing={2}>
            <Typography variant="h2">
                {content.fields.name}
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                {content.fields.oldPrice &&
                    <Typography color="grayText" sx={{ textDecoration: 'line-through' }} variant="body1" >
                        ${content.fields.oldPrice.toFixed(2)}
                    </Typography>
                }
                <Typography variant="h4" >
                    ${content.fields.price.toFixed(2)}
                </Typography>
            </Stack>
        </Stack>
    )
}

const Body = (props: ProductTypes) => {
    const { content } = props;

    const sentences = content.fields.description.split('.');
    const preview = sentences.slice(0, 2).join('.');
    const detect = sentences.join('.');

    const [hidden, setHidden] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<string>(preview);

    const handleShowMore = () => {
        setShowMore(content.fields.description)
    }

    const handleShowLess = () => {
        setShowMore(preview)
    }

    useEffect(() => {
        if (detect.length === preview.length) {
            setHidden(true)
        }
    }, [content.fields.description, detect, preview])

    return (
        <Box sx={{ p: 2 }}>
            <ReactMarkdown components={Markdown} >
                {showMore === preview && !hidden ? `${showMore}...` : showMore}
            </ReactMarkdown>
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
    )
}

type ThumbnailCarouselProps = {
    content: {
        fields: {
            productFiles: Image[];
        };
    };
    image: string;
    handleSetImage: (img: Image) => typeof img | void;
}

const ThumbnailCarousel = (props: ThumbnailCarouselProps) => {
    const { content, handleSetImage, image } = props;

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
        } else if (index === 5 && count > content.fields.productFiles.length - 1) {
            return
        } else if (index === 0) {
            setOffset(offset - 1)
            setCount(count - 1)
        } else if (index === 5) {
            setOffset(offset + 1)
            setCount(count + 1)
        }
    }

    const avatarSize = { width: 50, height: 80 };
    const buttonSize = { height: 40, width: 40 };

    return (
        <>
            {content.fields.productFiles &&
                <Stack spacing={1} direction="column" alignItems="center" >
                    {content.fields.productFiles.length > initialCount &&
                        <IconButton
                            disabled={offset === 0}
                            sx={buttonSize}
                            onClick={handleThumbnailLess}>
                            <KeyboardArrowUpIcon />
                        </IconButton>
                    }
                    {content.fields.productFiles.slice(offset, count).map((img: Image, index: number) =>
                        <Avatar
                            key={index}
                            onClick={() => { handleSetImage(img), carouselScroll(index) }}
                            component={CardActionArea}
                            sx={image === img.fields.file.url ? { border: 1, ...avatarSize } : avatarSize}
                            variant="square"
                            src={img.fields.file.url}
                            alt={img.fields.title} />
                    )}
                    {content.fields.productFiles.length > initialCount &&
                        <IconButton
                            disabled={count > content.fields.productFiles.length - 1}
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