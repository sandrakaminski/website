import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useLocation, useParams } from "react-router-dom";

import type { ArticleType } from "./ArticleType";
import DateFormatter from "@/components/DateFormatter";

const Summary = (props: ArticleType) => {
    const { content } = props;
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();

    return (
        <Grid xs={12} sm={6} md={4} >
            <Card >
                <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })}>
                    <CardMedia loading="lazy" component="img" sx={{ height: { xs: 350, lg: 450 } }} src={content?.fields.coverImage.fields.file.url} alt={content.fields.coverImage.fields.title} />
                    <CardHeader sx={{ maxHeight: 20, py: 6 }} title={content.fields.title} />
                </CardActionArea>
                <CardContent component={Stack} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <DateFormatter dateString={content.fields.date} />
                    <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
                    <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`)} variant="body2">
                        {content.fields.author.fields.name}
                    </Link>

                </CardContent>
            </Card >
        </Grid>
    )
}
export default Summary;