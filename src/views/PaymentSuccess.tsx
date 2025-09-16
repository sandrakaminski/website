import { JSX } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";

import { useCartContext, ActionTypes } from "@/views/Cart/cartActions";

const PaymentSuccess = (): JSX.Element => {
    const navigate = useNavigate();
    const { dispatch } = useCartContext();

    const getHistory = (): Array<string> => {
        if (document.referrer.includes("https://checkout.stripe.com/")) {
            ReactGA.event({
                category: "About",
                action: `New purchase has been completed`,
                label: "New Purchase made",
            });
            dispatch({ type: ActionTypes.CLEAR });
        } else {
            navigate("/shop");
        }
        return [document.referrer];
    };
    useQuery({ queryKey: [document.referrer], queryFn: getHistory });

    return (
        <>
            {document.referrer.includes("https://checkout.stripe.com/") && (
                <Stack
                    spacing={2}
                    sx={{ my: 10 }}
                    alignItems="center"
                    justifyContent="center">
                    <CheckCircleIcon
                        sx={{ fontSize: 100, color: "success.main" }}
                    />
                    <Typography variant="h3" align="center" gutterBottom>
                        Payment successful
                    </Typography>
                    <Typography color="grayText" align="center">
                        Thank you for your purchase. <br /> Please check your
                        inbox and spam folder for your confirmation email.{" "}
                    </Typography>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => navigate("/shop")}>
                        Return Home
                    </Button>
                </Stack>
            )}
        </>
    );
};
export default PaymentSuccess;
