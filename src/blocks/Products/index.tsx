import Detail from './Detail';
import Summary from './Summary';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

export const Products = ({ content, detail }: any) => {

    return (
        <>
            {detail
                ? <Detail content={content} />
                : <Summary content={content} />
            }
        </>
    );
}
export default Products; 