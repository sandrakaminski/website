import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation, useParams } from "react-router-dom";

import type { ArticleType } from "./ArticleType";
import DateFormatter from "@/components/DateFormatter";
import LoadingImage from '@/components/LoadingImage';

interface ExpandMoreProps {
    expand: string;
    onClick: () => void;
    children: React.ReactNode;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} sx={{ display: 'flex', mx: 1 }} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

const Summary = (props: ArticleType) => {
    const [expanded, setExpanded] = useState(false);
    const { content } = props;
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();

    const expandCard = () => {
        setExpanded(!expanded);
    }

    const cardRoot = {
        maxHeight: 45,
        display: 'block',
        overflow: 'hidden',
        textAlign: 'center',
    }

    const cardRootExpand = {
        display: 'block',
    }

    return (
        <Card>
            <CardActionArea onClick={() => navigate(`${pathname}/${content.fields.slug}`, { state: { data: slug } })}>
                <LoadingImage
                    card={true}
                    src={content?.fields.coverImage.fields.file.url}
                    alt={content.fields.coverImage.fields.title}
                />
            </CardActionArea>
            <CardHeader style={expanded ? cardRootExpand : cardRoot} title={content.fields.headline} />
            <ExpandMore
                expand={expanded ? 'true' : ''}
                onClick={expandCard}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded} unmountOnExit>
            </Collapse>
            <CardContent component={Stack} direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
                <DateFormatter dateString={content.fields.date} />
                <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
                <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`)} variant="body2">
                    {content.fields.author.fields.name}
                </Link>

            </CardContent>
        </Card>
    )
}
export default Summary;