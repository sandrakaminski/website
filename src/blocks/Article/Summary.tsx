import { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import IconButton from '@mui/material/IconButton';
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import type { ArticleType } from "./ArticleType";
import DateFormatter from "@/components/DateFormatter";
import LoadingImage from '@/components/LoadingImage';

const Summary = (props: ArticleType) => {
    const { content } = props;
    const [expanded, setExpanded] = useState<boolean>(false);
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();
    const preview = content.fields.headline.length > 25 ? `${content.fields.headline.substring(0, 25)}...` : content.fields.headline;

    const cardRoot = {
        display: 'block',
        textAlign: 'center',
        height: 60
    }

    const cardRootExpand = {
        display: 'block'
    }

    const handleShowMore = () => {
        setExpanded(true);
    }

    const handleShowLess = () => {
        setExpanded(false)
    }

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
                    <CardHeader sx={expanded ? cardRootExpand : cardRoot} title={expanded ? content.fields.headline : preview} />
                    {content.fields.headline.length > 25 ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mx: 1 }}>
                            {!expanded ?
                                <IconButton onClick={() => handleShowMore()} >
                                    <ExpandMoreIcon />
                                </IconButton>
                                :
                                <IconButton onClick={() => handleShowLess()} >
                                    <ExpandLessIcon />
                                </IconButton>
                            }
                        </Box>
                        :
                        <Box sx={{ height: 40 }} />
                    }
                    <CardContent component={Stack} direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
                        <DateFormatter dateString={content.fields.date} />
                        <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
                        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${content.fields.author.fields.slug}`)} variant="body2">
                            {content.fields.author.fields.name}
                        </Link>
                    </CardContent>
                </Card>
            }
        </>
    )
}
export default Summary;