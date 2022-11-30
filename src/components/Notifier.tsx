import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface AlertProps {
    open: boolean;
    message: string;
    anchorOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    }

}

const Notifier = (props: AlertProps) => {
    const { message } = props;
    
    return (
        <Snackbar  {...props}>
            <Alert sx={{ color: "info.contrastText" }} variant="filled" severity="info" >
                {message}
            </Alert>
        </Snackbar>
    )
}
export default Notifier;