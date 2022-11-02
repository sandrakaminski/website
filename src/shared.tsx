import Button from '@mui/material/Button';
import * as PropTypes from 'prop-types';

export const BlockPropTypes = {
    content: PropTypes.object.isRequired,
    className: PropTypes.string,
    detail: PropTypes.bool,
};

export const Markdown = {
    a: ({ ...props }: any) => <Button size="large" sx={{ my: 2 }} variant="outlined" {...props} />,
    img: ({ ...props }: any) => <img style={{ width: '60vw' }} {...props} />
};