
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";

import type { ProfileType } from './ProfileType';
import { LoadingImage } from "@/components/Outline";

const Summary = ({ content }: ProfileType) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let txt = content.fields.body;
    if (txt.length >= 75) {
        txt = `${txt.substring(0, 75)}...`;
    }

    return (
        <Card>
            <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`)}>
                <LoadingImage
                    card
                    src={content?.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title} />
                <Stack sx={{ p: 2 }} alignItems="center" direction="column" justifyContent="center" spacing={1}>
                    <Typography variant="subtitle1" >
                        {content.fields.name}
                    </Typography>
                    <Typography variant="body1" >
                        {txt}
                    </Typography>
                </Stack>
            </CardActionArea>
        </Card>
    )
}
export default Summary; 