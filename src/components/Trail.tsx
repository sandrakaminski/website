import { JSX } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

const Trail = (props: { current: string }): JSX.Element => {
    const { current } = props;
    const navigate = useNavigate();
    const { type } = useParams();

    const seperator = `\u203a`;

    return (
        <Breadcrumbs
            sx={{ display: { xs: "none", md: "flex" } }}
            separator={seperator}>
            <Link
                sx={{ cursor: "pointer", textTransform: "capitalize" }}
                underline="hover"
                color="grayText"
                onClick={() => navigate(`/${type}`, { state: { data: type } })}>
                {type}
            </Link>
            <Typography color="primary">{current}</Typography>
        </Breadcrumbs>
    );
};
export default Trail;
