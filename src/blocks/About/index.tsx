import React from 'react';

import Summary from './Summary';
import Detail from './Detail';

interface AboutProps {
    detail: Boolean;
    content: any;
}

export const About = (props: AboutProps) => {
    const { content, detail } = props;

    return (
        <>
            {detail === true
                ? <Detail content={content} />
                : <Summary content={content} />
            }
        </>
    )
}

export default About