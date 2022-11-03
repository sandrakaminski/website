import React, { createElement } from 'react';

import Profile from './Profile';
import ContactUs from './ContactUs';

const blocks: any = { Profile }

const block = (content: any) => {
    let name: string;

    if (content.sys.contentType.sys.id === 'assembly') {
        name = `${(content.fields.layout)}`;
    }
    else {
        name = content.sys.contentType.sys.id;
    }
    return blocks[name];
}


const Factory = (props: any) => {
    const { content } = props;
    console.log("51", content)
    return block(content);
}

export const Renderer = (props: any) => {
    const { content } = props;

    return (
        <>
            {content?.fields.references.map((block: any, index: number) =>
                <Factory key={index} content={block} />
            )}
        </>
    )
}

export default Renderer;