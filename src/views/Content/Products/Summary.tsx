import React from 'react';

import Box from '@mui/material/Box';
import CardActionArea from "@mui/material/CardActionArea";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import ReactGA from 'react-ga4';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import LoadingImage from '@/components/LoadingImage';
import type { ProductTypes, ContentEntryProps } from '@/types';

const Summary = (props: ContentEntryProps<ProductTypes>) => {
    const { contentEntry } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();

    const handleClick = () => {
        navigate(`${pathname}/${contentEntry.fields.slug}`, { state: { data: slug } })
        ReactGA.event({
            category: 'Product',
            action: `View detail for ${contentEntry.fields.name}`,
            label: contentEntry.fields.name,
        });
    }

    return (
        <>
            <CardActionArea onClick={() => handleClick()} >
                <SoldOutBanner soldOut={!contentEntry.fields.inStock} />
                <LoadingImage
                    card="true"
                    src={contentEntry?.fields.featureImage.fields.file.url}
                    alt={contentEntry.fields.featureImage.fields.title} />

                <Stack sx={{ p: 2 }} alignItems="center" direction="column" justifyContent="center" spacing={1} >
                    <Typography variant="h6" >{`${contentEntry.fields.name}`}</Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        {contentEntry.fields.oldPrice &&
                            <Typography color="grayText" sx={{ textDecoration: 'line-through' }} variant="body1" >
                                ${contentEntry.fields.oldPrice.toFixed(2)}
                            </Typography>
                        }
                        <Typography color="grayText" variant="body1" >
                            ${contentEntry.fields.price.toFixed(2)} NZD
                        </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </>
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
                <Box sx={{ p: 4, background: 'rgba(255,255,255,.80)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="subtitle1">SOLD OUT</Typography>
                </Box>
            }
        </>
    )
}