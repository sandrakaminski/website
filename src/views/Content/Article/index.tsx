import React from 'react';

import { Entry } from 'contentful';

import Detail from './Detail';
import Summary from './Summary';
import type { ArticleType } from '@/types'

export type ArticleTypes = {
    contentEntry: Entry<ArticleType>;
    detail?: boolean;
}

const Article = (props: ArticleTypes): React.ReactElement => {
    const { contentEntry, detail } = props;

    return (
        <>
            {detail === true
                ? <Detail contentEntry={contentEntry} />
                : <Summary contentEntry={contentEntry} />
            }
        </>
    )
}
export default Article;

