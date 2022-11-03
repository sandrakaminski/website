import React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, CardHeader, CardMedia } from "@mui/material";

import { useNavigate } from "react-router-dom";


const Summary = ({ content }: any) => {
    const navigate = useNavigate();

    let txt = content.fields.body
    if (txt.length >= 75) {
        txt = txt.substring(0, 75) + '...';
    }

    return (
        <Card>
            {content &&
                <CardActionArea onClick={() => navigate(`/about/${content.fields.slug}`)}>
                    <CardMedia component="img" src={content?.fields.image.fields.file.url} alt={content.fields.image.fields.title} />
                    <CardHeader title={content.fields.name} subheader={txt} />
                </CardActionArea>
            }
        </Card>
    )
}
export default Summary; 