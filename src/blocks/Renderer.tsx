import React from 'react';

import Profile from './Profile';
import ContactUs from './ContactUs';

const blocks = { Profile, ContactUs }

const block = (content: any) => {
    let name;
    if (content.sys.contentType.sys.id === 'assembly') {
        name = `Layout${(content.fields.layout || 'Grid')}`;
    } else {
        name = content.sys.contentType.sys.id;
    }

    return blocks[name.charAt(0).toUpperCase() + name.slice(1)];
}

export const Renderer = (props: any) => {
    const { content } = props;
    return React.createElement(block(content), props);
}