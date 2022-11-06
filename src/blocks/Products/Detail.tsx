import { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useNavigate, createSearchParams } from 'react-router-dom';

import { Markdown } from '../../shared';

export const Detail = ({ content }: any) => {
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();

    const handleCart = () => {
        navigate('/cart', {
            state: { data: content, quantity: quantity },
        })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setQuantity(event.target.value);
    };

    return (
        <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center" >
            <Box sx={{ mt: 4 }}>
                {content.fields.featureImage &&
                    <CardMedia
                        component="img"
                        sx={{ width: '45%', height: 'auto' }}
                        src={content?.fields.featureImage.fields.file.url}
                        alt={content.fields.featureImage.fields.title}
                    />
                }
            </Box>
            <Typography variant="h2">
                {content.fields.name}
            </Typography>
            <Container maxWidth="sm">
                <ReactMarkdown components={Markdown} >{content.fields.description}</ReactMarkdown>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2} direction="row">
                    <Button onClick={handleCart} startIcon={<ShoppingCartOutlinedIcon />} variant={"outlined"}>
                        Add to Cart
                    </Button>
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel id="quantity">Quantity</InputLabel>
                        <Select onChange={handleChange} label="Quantity" defaultValue={'1'}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Container>
        </Stack >

    );
}
export default Detail;