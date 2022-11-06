import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { useNavigate } from 'react-router-dom';

interface TrailProps {
    current: {
        name: string;
    }
    root: {
        name: string;
        path: string;
    }
}

export const Trail = (props: TrailProps) => {
    const { current, root } = props;
    const navigate = useNavigate();

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link
                sx={{ cursor: 'pointer' }}
                underline="hover"
                color="inherit"
                onClick={() => navigate(`/${root.path}`, { state: { data: root.path } })}
            >
                {root.name}
            </Link>
            <Typography color="text.primary">{current.name}</Typography>
        </Breadcrumbs>
    );
}
export default Trail;