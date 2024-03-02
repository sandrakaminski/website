import { JSX } from "react";

import { Entry } from "contentful";

import Detail from "./Detail";
import Summary from "./Summary";
import { ProductTypes } from "@/types";

export type ProductProps = {
    contentEntry: Entry<ProductTypes>;
    detail?: boolean;
};

const Products = (props: ProductProps): JSX.Element => {
    const { contentEntry, detail } = props;
    return (
        <>
            {detail ? (
                <Detail contentEntry={contentEntry} />
            ) : (
                <Summary contentEntry={contentEntry} />
            )}
        </>
    );
};
export default Products;
