import React from 'react';

import { Entry } from 'contentful';

import Detail from './Detail';
import Summary from './Summary';
import type { ProfileType } from '@/types';

type BlockProps = {
    contentEntry: Entry<ProfileType>;
    detail?: boolean;
}

const Profile = (props: BlockProps) => {
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

export default Profile