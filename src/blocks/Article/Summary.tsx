import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation, useParams } from "react-router-dom";

import type { ArticleType } from "./ArticleType";
import DateFormatter from "@/components/DateFormatter";
import LoadingImage from '@/components/LoadingImage';

const Summary = (props: ArticleType) => {
    const { content } = props;
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {content &&
                <Card>
                    <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })}>
                        <LoadingImage
                            card="true"
                            src={content?.fields.coverImage.fields.file.url}
                            alt={content.fields.coverImage.fields.title}
                        />
                    </CardActionArea>
                    <Typography sx={{ p: 1, textTransform: 'capitalize' }} align="center" variant="h6">
                        {content.fields.headline}
                    </Typography>
                    <CardContent component={Stack} direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
                        <DateFormatter dateString={content.fields.date} />
                        <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
                        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`)} >
                            {content.fields.author.fields.name}
                        </Link>
                    </CardContent>
                </Card>
            }
        </>
    )
}
export default Summary;