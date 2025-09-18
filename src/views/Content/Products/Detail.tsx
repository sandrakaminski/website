import { useState, JSX } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Asset, Entry } from "contentful";
import ReactGA from "react-ga4";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import CartPopper from "./CartPopper";
import ProductReviews from "./ProductReviews";
import DefaultImage from "@/components/DefaultImage";
import Notifier from "@/components/Notifier";
import Trail from "@/components/Trail";
import { useImageSrc } from "@/hooks";
import type { ProductTypes, ContentEntryProps } from "@/types";
import { useCartContext, ActionTypes } from "@/views/Cart/cartActions";

const Detail = (props: ContentEntryProps<ProductTypes>): JSX.Element => {
    const { contentEntry } = props;
    const { dispatch } = useCartContext();
    const [open, setOpen] = useState<boolean>(false);
    const [clickEvent, setClickEvent] = useState<boolean>(false);
    const [image, setImage] = useState<string>(
        contentEntry.fields.featureImage.fields.file.url
    );

    const handleCart = (): void => {
        setClickEvent(true);
        dispatch({
            id: contentEntry.fields.productId,
            amount: 1,
            product: contentEntry.fields,
            type: ActionTypes.ADD,
        });
        ReactGA.event({
            category: "Product Detail",
            action: `Add ${contentEntry.fields.name} to cart`,
            label: contentEntry.fields.name,
        });
    };

    const handleSetImage = (img: Asset): void => {
        setImage(img.fields.file.url);
    };

    return (
        <>
            <Trail current={contentEntry.fields.name} />
            <Notifier
                open={contentEntry.fields.nzShippingOnly}
                message="This product is only available for purchase within New Zealand."
            />
            <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Card
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        variant="outlined"
                        component={Stack}
                        spacing={2}>
                        <CardActionArea
                            sx={{ backgroundColor: "gray.100" }}
                            onClick={() => setOpen(true)}>
                            <DefaultImage
                                objectfit="contain"
                                height={{
                                    xs: "100%",
                                    md: 600,
                                    xl: "70vh",
                                }}
                                id="featureImage"
                                src={image}
                                alt={"Feature image"}
                            />
                        </CardActionArea>
                        <ThumbnailCarousel
                            contentEntry={contentEntry}
                            image={image}
                            handleSetImage={handleSetImage}
                        />
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, lg: 5 }}>
                    <Card
                        variant="outlined"
                        sx={{
                            p: 2,
                            height: "100%",
                        }}>
                        <Heading contentEntry={contentEntry} />
                        <Stack
                            sx={{ my: 2 }}
                            alignItems="flex-start"
                            spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    id="addToCart"
                                    sx={{ mb: 2 }}
                                    size="large"
                                    disabled={!contentEntry.fields.inStock}
                                    onClick={handleCart}
                                    endIcon={<ShoppingCartOutlinedIcon />}
                                    variant="contained">
                                    {!contentEntry.fields.inStock
                                        ? "Sold out"
                                        : contentEntry.fields.preOrder
                                        ? "Pre-order"
                                        : "Add to cart"}
                                </Button>
                                {contentEntry.fields.promotion && (
                                    <Button
                                        color="info"
                                        sx={{ mb: 2 }}
                                        size="large"
                                        onClick={() => {
                                            document
                                                .querySelector("#promotion")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                        }}
                                        variant="outlined">
                                        Gift with purchase
                                    </Button>
                                )}
                            </Stack>
                            <Divider sx={{ width: "100%" }} />
                            <Typography variant="h4">Description</Typography>
                            <Box
                                sx={{
                                    position: "relative",
                                    overflowY: "auto",
                                    maxHeight: {
                                        xs: "100%",
                                        md: window.innerHeight * 0.5,
                                    },
                                    width: "100%",
                                }}
                                id="description">
                                <ReactMarkdown remarkPlugins={[gfm]}>
                                    {contentEntry.fields.description}
                                </ReactMarkdown>
                            </Box>
                        </Stack>
                    </Card>
                </Grid>
                {contentEntry.fields.promotion && (
                    <Grid size={{ xs: 12 }}>
                        <Card
                            id="promotion"
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderColor: "info.main",
                                bgcolor: "info.lighter",
                            }}>
                            <Typography variant="h4">
                                GIFT WITH PURCHASE OFFERING
                            </Typography>
                            <ReactMarkdown remarkPlugins={[gfm]}>
                                {contentEntry.fields.promotion}
                            </ReactMarkdown>
                        </Card>
                    </Grid>
                )}
                <Grid size={{ xs: 12 }}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                        <ProductReviews contentEntry={contentEntry} />
                    </Card>
                </Grid>
            </Grid>
            <CartPopper clickEvent={clickEvent} />

            <Dialog maxWidth={false} open={open} onClose={() => setOpen(false)}>
                <Fab
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        display: { xs: "flex", sm: "none" },
                    }}
                    color="inherit"
                    onClick={() => setOpen(false)}>
                    <CloseIcon />
                </Fab>
                <DefaultImage
                    style={{
                        backgroundColor: "black",
                    }}
                    objectfit="contain"
                    height={{
                        // xs: window.innerHeight * 0.9,
                        sm: window.innerHeight * 0.8,
                        lg: window.innerHeight * 0.9,
                    }}
                    src={image}
                    alt="Feature img"
                />
            </Dialog>
        </>
    );
};
export default Detail;

type HeadingProps = {
    contentEntry: Entry<ProductTypes>;
    sx?: object;
};

const Heading = (props: HeadingProps): JSX.Element => {
    const { contentEntry, sx } = props;

    return (
        <Stack sx={{ ...sx }} alignItems="flex-start" spacing={2}>
            <Typography id="productName" variant="h2">
                {contentEntry.fields.name}
            </Typography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}>
                {contentEntry.fields.oldPrice && (
                    <Typography
                        id="oldPrice"
                        color="grayText"
                        sx={{ textDecoration: "line-through" }}
                        variant="body1">
                        ${contentEntry.fields.oldPrice.toFixed(2)}
                    </Typography>
                )}
                <Stack
                    id="price"
                    spacing={1}
                    direction="row"
                    alignItems="flex-end">
                    <Typography variant="h4">
                        ${contentEntry.fields.price.toFixed(2)}
                    </Typography>
                    <Typography>NZD</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

type ThumbnailCarouselProps = {
    contentEntry: {
        fields: {
            productFiles: Asset[];
        };
    };
    image: string;
    handleSetImage: (img: Asset) => typeof img | void;
};

const ThumbnailCarousel = (props: ThumbnailCarouselProps): JSX.Element => {
    const { contentEntry, handleSetImage, image } = props;

    const initialCount = 6;
    const [offset, setOffset] = useState<number>(0);
    const [count, setCount] = useState<number>(initialCount);

    const handleThumbnailLess = () => {
        setOffset(offset - 1);
        setCount(count - 1);
    };

    const handleThumbnailMore = () => {
        setOffset(offset + 1);
        setCount(count + 1);
    };

    const carouselScroll = (index: number) => {
        if (
            (index === 0 && offset === 0) ||
            (index === 5 && count > contentEntry.fields.productFiles.length - 1)
        ) {
            return;
        }

        if (index === 0) {
            setOffset(offset - 1);
            setCount(count - 1);
        } else if (index === 5) {
            setOffset(offset + 1);
            setCount(count + 1);
        }
    };

    const handleImage = (img: Asset, index: number) => {
        handleSetImage(img);
        carouselScroll(index);
    };

    const buttonSize = {
        height: 40,
        width: 40,
        display: { xs: "none", sm: "inline-flex" },
    };

    return (
        <>
            {contentEntry.fields.productFiles && (
                <Stack
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                    direction="row"
                    alignItems="center">
                    {contentEntry.fields.productFiles.length > initialCount && (
                        <>
                            <IconButton
                                disabled={offset === 0}
                                sx={buttonSize}
                                onClick={handleThumbnailLess}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                            <Fab
                                disabled={offset === 0}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    left: 4,
                                    display: { xs: "flex", sm: "none" },
                                    bgcolor: "background.paper",
                                }}
                                onClick={handleThumbnailLess}>
                                <KeyboardArrowLeftIcon />
                            </Fab>
                        </>
                    )}

                    {contentEntry.fields.productFiles
                        .slice(offset, count)
                        .map((img: Asset, index: number) => (
                            <LoadingAvatar
                                id="productFiles"
                                key={index}
                                src={img.fields.file.url}
                                image={image}
                                alt={img.fields.title}
                                onClick={() => handleImage(img, index)}
                            />
                        ))}

                    {contentEntry.fields.productFiles.length > initialCount && (
                        <>
                            <IconButton
                                disabled={
                                    count >
                                    contentEntry.fields.productFiles.length - 1
                                }
                                sx={buttonSize}
                                onClick={handleThumbnailMore}>
                                <ChevronRightIcon />
                            </IconButton>
                            <Fab
                                disabled={
                                    count >
                                    contentEntry.fields.productFiles.length - 1
                                }
                                size="small"
                                sx={{
                                    position: "absolute",
                                    right: 4,
                                    display: { xs: "flex", sm: "none" },
                                    bgcolor: "background.paper",
                                }}
                                onClick={handleThumbnailMore}>
                                <ChevronRightIcon />
                            </Fab>
                        </>
                    )}
                </Stack>
            )}
        </>
    );
};

type loadingAvatarProps = {
    src: string;
    onClick: () => void;
    image: string;
    alt: string;
    id: string;
};

const LoadingAvatar = (props: loadingAvatarProps): JSX.Element => {
    const { src, image } = props;

    const { load } = useImageSrc(src);
    const imgSizing = { width: 50, height: 80 };

    return (
        <>
            {load ? (
                <Skeleton
                    sx={{ ...imgSizing, m: "2px" }}
                    variant="rectangular"
                />
            ) : (
                <Avatar
                    sx={
                        image === src
                            ? { ...imgSizing, border: 1, p: "2px" }
                            : {
                                  ...imgSizing,
                                  border: 1,
                                  borderColor: "transparent",
                                  p: "2px",
                              }
                    }
                    component={CardActionArea}
                    variant="square"
                    {...props}
                />
            )}
        </>
    );
};
