import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import { useNavigate, useLocation } from "react-router-dom";

const Summary = ({ content }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let txt = content.fields.body
    if (txt.length >= 75) {
        txt = txt.substring(0, 75) + '...';
    }


    const d = new Date(content.fields.date);
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[monthIndex]
    const dayName = days[d.getDay()]
    const formatted = `${dayName}, ${date} ${monthName} ${year}`

    const uploaded = formatted.toString()

    return (

        <Card sx={{ maxHeight: 600 }}>
            {content &&
                <>
                    <CardHeader
                        title={
                            <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`)} gutterBottom variant="body2">
                                {content.fields.author.fields.name}
                            </Link>}
                        subheader={uploaded}
                        avatar={<Avatar src={content?.fields.author.fields.image.fields.file.url} alt={content?.fields.author.fields.image.fields.file.title} />} />
                    <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`)}>
                        <CardMedia component="img" sx={{ height: 300 }} src={content?.fields.coverImage.fields.file.url} alt={content.fields.coverImage.fields.title} />
                        <CardHeader title={content.fields.title} subheader={txt} />
                    </CardActionArea>
                </>
            }
        </Card >

    )
}
export default Summary;

const days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']