import React from 'react';

import Center from './Center';
import Column from './Column';
import Left from './Left';
import Right from './Right';
import type { Content, ContentProps } from '@/types';

export const Section = (props: ContentProps<Content>) => {
    const { contentEntry } = props;

    switch (contentEntry?.fields.sectionType) {
        case "Center":
            return <Center contentEntry={contentEntry} />
        case "Right":
            return <Right contentEntry={contentEntry} />
        case "Left":
            return <Left contentEntry={contentEntry} />
        case "Column":
            return <Column contentEntry={contentEntry} />
        default:
            return <Center contentEntry={contentEntry} />
    }
}
export default Section;