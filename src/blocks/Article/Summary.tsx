import React, { useState, useEffect } from 'react';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation, useParams } from "react-router-dom";

import DateFormatter from "@/components/DateFormatter";
import LoadingImage from '@/components/LoadingImage';
import type { ArticleType, ContentProps } from "@/types";

const Summary = (props: ContentProps<ArticleType>) => {
    const { contentEntry } = props;
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (pathname === "/blog") {
            setStyle({ p: 1, height: { sm: 130, lg: 110 } })
        }
        else {
            setStyle({ p: 1, height: 100 })
        }
    }, [pathname])

    return (
        <>
            {contentEntry &&
                <Card>
                    <CardActionArea onClick={() => navigate(`${pathname}/${contentEntry.fields.slug}`, { state: { data: slug } })}>
                        <LoadingImage
                            card="true"
                            src={contentEntry?.fields.coverImage.fields.file.url}
                            alt={contentEntry.fields.coverImage.fields.title}
                        />
                    </CardActionArea>
                    <Typography sx={style} align="center" variant="h6">
                        {contentEntry.fields.headline}
                    </Typography>
                    <CardContent component={Stack} direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
                        <DateFormatter dateString={contentEntry.fields.date} />
                        <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
                        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/about/${contentEntry.fields.author.fields.slug}`)} >
                            {contentEntry.fields.author.fields.name}
                        </Link>
                    </CardContent>
                </Card>
            }
        </>
    )
}
export default Summary;