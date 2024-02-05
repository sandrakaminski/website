import { JSX } from "react";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";

import LoadingImage from "@/components/LoadingImage";
import type { ProfileType, ContentEntryProps } from '@/types';

const Summary = (props: ContentEntryProps<ProfileType>): JSX.Element => {
    const { contentEntry } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let txt = contentEntry.fields.body;
    if (txt.length >= 75) {
        txt = `${txt.substring(0, 75)}...`;
    }

    return (
        <Card>
            {contentEntry &&
                <CardActionArea id="profileNav" onClick={() => navigate(`${pathname}/${contentEntry.fields.slug}`)}>
                    <LoadingImage
                        id="profileImage"
                        card="true"
                        src={contentEntry?.fields.image.fields.file.url}
                        alt={contentEntry.fields.image.fields.title} />
                    <Stack sx={{ p: 2 }} alignItems="center" direction="column" justifyContent="center" spacing={1}>
                        <Typography id="profileName" variant="subtitle1" >
                            {contentEntry.fields.name}
                        </Typography>
                        <Typography id="profileBody" variant="body1" >
                            {txt}
                        </Typography>
                    </Stack>
                </CardActionArea>
            }
        </Card>
    )
}
export default Summary; 