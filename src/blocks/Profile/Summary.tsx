
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, useLocation } from "react-router-dom";

import type { ProfileType } from './ProfileType';

const Summary = ({ content }: ProfileType) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let txt = content.fields.body
    if (txt.length >= 75) {
        txt = txt.substring(0, 75) + '...';
    }

    return (
        <Card>
            {content &&
                <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`)}>
                    <CardMedia sx={{ height: 400 }} component="img" src={content?.fields.image.fields.file.url} alt={content.fields.image.fields.title} />
                    <CardHeader title={content.fields.name} subheader={txt} />
                </CardActionArea>
            }
        </Card>
    )
}
export default Summary; 