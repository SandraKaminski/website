import { useEffect } from "react";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "@/views/Cart/cartProvider";

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const { clear, cart } = useCartContext();
    useEffect(() => {
        if (cart?.length > 0) {
            clear()
        }
    }, [clear, cart, navigate]);

    return (
        <Stack spacing={2} sx={{ mt: 10 }} alignItems="center" justifyContent="center">
            <CheckCircleIcon sx={{ fontSize: 100, color: "success.main" }} />
            <Typography variant="h3" align="center" gutterBottom>Payment successful</Typography>
            {/* <Typography variant="subtitle1" gutterBottom>   Thank you for your purchase.</Typography> */}
            <Typography color="grayText" align="center" variant="subtitle1" >  Thank you for your purchase. <br /> Please check your inbox and spam folder for your confirmation email. </Typography>
            <Button size="large" variant="contained" onClick={() => navigate("/shop")} >Return Home</Button>
        </Stack>
    )
}
export default PaymentSuccess;