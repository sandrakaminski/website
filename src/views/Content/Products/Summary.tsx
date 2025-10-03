import { JSX } from "react";

import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactGA from "react-ga4";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import DefaultImage from "@/components/DefaultImage";
import type { ProductTypes, ContentEntryProps } from "@/types";

const Summary = (props: ContentEntryProps<ProductTypes>): JSX.Element => {
    const { contentEntry } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();

    const handleClick = () => {
        navigate(`${pathname}/${contentEntry.fields.slug}`, {
            state: { data: slug },
        });
        ReactGA.event({
            category: "Product",
            action: `View detail for ${contentEntry.fields.name}`,
            label: contentEntry.fields.name,
        });
    };

    return (
        <>
            <CardActionArea id="productLink" onClick={() => handleClick()}>
                <Banner state={contentEntry.fields} />
                <DefaultImage
                    isCard
                    enableZoom
                    data-testid="featureImage"
                    id="featureImage"
                    src={contentEntry?.fields.featureImage.fields.file.url}
                    alt={contentEntry.fields.featureImage.fields.title}
                />
                <Stack
                    sx={{ p: 2 }}
                    alignItems="center"
                    direction="column"
                    justifyContent="center"
                    spacing={1}>
                    <Typography
                        data-testid="productName"
                        id="productName"
                        variant="h6">{`${contentEntry.fields.name}`}</Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}>
                        {contentEntry.fields.oldPrice && (
                            <Typography
                                data-testid="oldPrice"
                                id="oldPrice"
                                color="grayText"
                                sx={{ textDecoration: "line-through" }}
                                variant="body1">
                                ${contentEntry.fields.oldPrice.toFixed(2)}
                            </Typography>
                        )}
                        <Typography
                            id="price"
                            data-testid="price"
                            color="grayText"
                            variant="body1">
                            ${contentEntry.fields.price.toFixed(2)} NZD
                        </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </>
    );
};
export default Summary;

type BannerType = {
    state: {
        inStock: boolean;
        newProduct?: boolean;
        preOrder?: boolean;
    };
};

const Banner = (props: BannerType): JSX.Element => {
    const { state } = props;

    const style = {
        zIndex: 1,
        p: 4,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <>
            {!state.inStock ? (
                <Box
                    sx={{
                        background: "rgba(255,255,255,.80)",
                        ...style,
                    }}>
                    <Typography
                        id="sold-out"
                        data-testid="sold-out"
                        variant="subtitle1">
                        SOLD OUT
                    </Typography>
                </Box>
            ) : (
                <>
                    {state.preOrder ? (
                        <Box
                            sx={{
                                background: "rgb(98, 107, 63,.80)",
                                ...style,
                            }}>
                            <Typography
                                id="pre-order-product"
                                data-testid="pre-order-product"
                                color="white"
                                variant="subtitle1">
                                PRE-ORDER
                            </Typography>
                        </Box>
                    ) : (
                        state.newProduct && (
                            <Box
                                sx={{
                                    background: "rgb(98, 107, 63,.80)",
                                    ...style,
                                }}>
                                <Typography
                                    id="new-product"
                                    data-testid="new-product"
                                    color="white"
                                    variant="subtitle1">
                                    NEW
                                </Typography>
                            </Box>
                        )
                    )}
                </>
            )}
        </>
    );
};
