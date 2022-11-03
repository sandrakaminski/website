import React from 'react';

import Summary from './Summary';
import Detail from './Detail';

interface ProfileProps {
    detail: Boolean;
    content: any;
}

export const Profile = (props: ProfileProps) => {
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

export default Profile