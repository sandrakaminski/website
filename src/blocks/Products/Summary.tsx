import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import type { ProductTypes } from './ProductTypes';

export const Summary = ({ content }: ProductTypes) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();

    return (
        <Card>
            <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })}>
                <SoldOutBanner soldOut={!content.fields.inStock} />
                <CardMedia loading="lazy" component="img" sx={{ height: 500 }} src={content?.fields.featureImage.fields.file.url} alt={content.fields.featureImage.fields.title} />
                <Typography align="center" sx={{ p: 1 }} >{`${content.fields.name}`}</Typography>
            </CardActionArea>
        </Card>
    );
}
export default Summary;

type SoldOutType = {
    soldOut: boolean
}

const SoldOutBanner = (props: SoldOutType) => {
    const { soldOut } = props;

    return (
        <>
            {soldOut &&
                <Box sx={{ p: 2, background: 'rgba(0,0,0,0.70)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ color: 'background.paper' }} variant="subtitle1">Sold out</Typography>
                </Box>
            }
        </>
    )
}