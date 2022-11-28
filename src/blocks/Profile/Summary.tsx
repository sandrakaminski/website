
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useLocation } from "react-router-dom";

import type { ProfileType } from './ProfileType';

const Summary = ({ content }: ProfileType) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let txt = content.fields.body
    if (txt.length >= 75) {
        txt = `${txt.substring(0, 75)}...`;
    }

    return (
        <Grid xs={12} sm={6} md={4} >
            <Card>
                {content &&
                    <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`)}>
                        <CardMedia sx={{ height: { xs: 'auto', sm: '60vw', md: '38vw', xl: 600 }, width: '100%' }} component="img" src={content?.fields.image.fields.file.url} alt={content.fields.image.fields.title} />
                        <CardHeader title={content.fields.name} subheader={txt} />
                    </CardActionArea>
                }
            </Card>
        </Grid>
    )
}
export default Summary; 