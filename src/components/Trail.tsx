import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

interface TrailProps {
    current: String;
}

export const Trail = (props: TrailProps) => {
    const { current } = props;
    const navigate = useNavigate();
    const { type } = useParams();

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link
                sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                underline="hover"
                color="grayText"
                onClick={() => navigate(`/${type}`, { state: { data: type } })}
            >
                {type}
            </Link>
            <Typography color="text.primary">{current}</Typography>
        </Breadcrumbs>
    );
}
export default Trail;