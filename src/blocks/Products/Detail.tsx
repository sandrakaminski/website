import { useState } from 'react';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import type { ProductTypes } from './ProductTypes';
import Trail from '@/components/Trail';
import { Markdown } from '@/shared';

export const Detail = (props: ProductTypes) => {
    const { content } = props
    const [quantity, setQuantity] = useState<string>('1');
    const navigate = useNavigate();

    const handleCart = () => {
        navigate('/cart', {
            state: { data: content, quantity: quantity },
        })
    }

    const handleChange = (e: SelectChangeEvent) => {
        setQuantity(e.target.value);
    };

    return (
        <>
            <Trail current={content.fields.name} />
            <Grid container spacing={2} justifyContent="center"  >
                <Grid xs={12} md={6}>
                    <Typography sx={{ my: 4 }} align="center" gutterBottom variant="h2">
                        {content.fields.name}
                    </Typography>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Typography >
                            ${content.fields.price}
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel id="quantity">Quantity</InputLabel>
                            <Select onChange={handleChange} label="Quantity" defaultValue={'1'}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant={"outlined"}>
                            Add to Cart
                        </Button>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <ReactMarkdown components={Markdown} >{content.fields.description}</ReactMarkdown>
                </Grid>
                <Grid xs={12} md={6}>
                    {content.fields.featureImage &&
                        <CardMedia
                            component="img"
                            src={content?.fields.featureImage.fields.file.url}
                            alt={content.fields.featureImage.fields.title}
                        />
                    }
                </Grid>
            </Grid >
        </>
    );
}
export default Detail;