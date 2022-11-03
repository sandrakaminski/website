import React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, CardHeader, CardMedia } from "@mui/material";

import { useNavigate } from "react-router-dom";


const Summary = ({ content }: any) => {
    const navigate = useNavigate();

    return (
        <Card>
            {content &&
                <CardActionArea onClick={() => navigate(`/about/${content.fields.slug}`, { state: { data: 'profile' } })}>
                    <CardMedia component="img" src={content?.fields.image.fields.file.url} alt={content.fields.image.fields.title} />
                    <CardHeader title={content.fields.name} subheader={content.fields.name} />
                </CardActionArea>
            }
        </Card>
    )
}
export default Summary; 