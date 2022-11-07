import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import DateFormatter from "../../components/DateFormatter";
import type { ArticleType } from "./ArticleType";

const Summary = ({ content }: ArticleType) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();

    return (
        <Card >
            <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })}>
                <CardMedia component="img" sx={{ height: { xs: 350, lg: 450 } }} src={content?.fields.coverImage.fields.file.url} alt={content.fields.coverImage.fields.title} />
                <CardHeader sx={{ maxHeight: 20, py: 6 }} title={content.fields.title} />
            </CardActionArea>
            <CardContent component={Stack} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`)} variant="body2">
                    {content.fields.author.fields.name}
                </Link>
                <DateFormatter dateString={content.fields.date} />
            </CardContent>
        </Card >

    )
}
export default Summary;