import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export const Summary = ({ content }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug } = useParams();

    return (
        <Card >
            <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })}>
                <CardMedia component="img" sx={{ height: { xs: 350, lg: 450 } }} src={content?.fields.featureImage.fields.file.url} alt={content.fields.featureImage.fields.title} />
                <CardHeader sx={{ maxHeight: 20, py: 6 }} title={content.fields.name} subheader={`$${content.fields.price}`} />
            </CardActionArea>
        </Card>
    );
}
export default Summary;