import { useState } from 'react';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ReactMarkdown from 'react-markdown';

import type { ProductTypes } from './ProductTypes';
import Trail from '@/components/Trail';
import { Markdown, Image } from '@/shared';
import { useCartContext } from "@/views/Cart/cartProvider";

export const Detail = (props: ProductTypes) => {
    const { content } = props;
    const { addToCart } = useCartContext();
    const [open, setOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string>(content.fields.featureImage.fields.file.url);

    const handleCart = () => {
        addToCart(content.fields.productId, '1', content.fields)
    }

    const handleSetImage = (img: any) => {
        setImage(img.fields.file.url)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <Trail current={content.fields.name} />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} open={content.fields.nzShippingOnly} >
                <Alert sx={{ color: "info.contrastText" }} variant="filled" severity="info" >
                    This product is only available for shipping within New Zealand.
                </Alert>
            </Snackbar>
            <Grid container spacing={2}   >
                <Grid xs={12} md={6}>
                    <Stack sx={{ mb: 4 }} spacing={4} alignItems="center"  >
                        <Typography align="center" gutterBottom variant="h2">
                            {content.fields.name}
                        </Typography>
                        <Typography gutterBottom variant="h4" >
                            ${content.fields.price}
                        </Typography>
                    </Stack>
                    <ReactMarkdown components={Markdown} >{content.fields.description}</ReactMarkdown>
                    <Stack sx={{ mt: 4 }} spacing={4} alignItems="center"  >
                        <Button size="large" disabled={!content.fields.inStock} onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant={"outlined"}>
                            {!content.fields.inStock ? "Sold out" : "Add to Cart"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid xs={12} md={6}>
                    {content.fields.featureImage &&
                        <CardActionArea sx={{ backgroundColor: 'gray.100' }} onClick={() => handleOpen()}>
                            <img
                                style={{ height: 650, width: '100%', objectFit: 'contain' }}
                                loading="lazy"
                                src={image}
                                alt={"Feature image"}
                            />
                        </CardActionArea>
                    }
                    {content.fields.productFiles &&
                        <Grid justifyContent="center" container >
                            {content.fields.productFiles.map((img: Image, index: number) =>
                                <Grid key={index}  >
                                    <Avatar onClick={() => handleSetImage(img)} component={CardActionArea} sx={image === img.fields.file.url ? { border: 1, width: 50, height: 80 } : { width: 50, height: 80 }} variant="square" src={img.fields.file.url} alt={img.fields.title} />
                                </Grid>
                            )}
                        </Grid>
                    }
                </Grid>
            </Grid >
            <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>
                <img
                    style={{ maxHeight: 700 }}
                    loading="eager"
                    src={image}
                    alt={"Feature image"}
                />
            </Dialog>
        </>
    );
}
export default Detail;