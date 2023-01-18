import React from 'react';

import { Entry } from 'contentful';

import Detail from './Detail';
import Summary from './Summary';
import { ProductTypes } from '@/types';

type BlockProps = {
    contentEntry: Entry<ProductTypes>;
    detail?: boolean;
}

const Products = (props: BlockProps) => {
    const { contentEntry, detail } = props;
    return (
        <>
            {detail
                ? <Detail contentEntry={contentEntry} />
                : <Summary contentEntry={contentEntry} />
            }
        </>
    );
}
export default Products; 