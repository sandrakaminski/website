import React, { useEffect } from 'react';

import { Entry } from 'contentful';
import { useNavigate } from 'react-router-dom';

import Detail from './Detail';
import Summary from './Summary';
import type { ProfileType } from '@/types';

type BlockProps = {
    contentEntry: Entry<ProfileType>;
    detail?: boolean;
}

const Profile = (props: BlockProps) => {
    const { contentEntry, detail } = props;
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/profile/${contentEntry.fields.slug}`, { state: { data: contentEntry.fields.slug } })
    }, [contentEntry.fields.slug, navigate])

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