import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import Profile from './Profile';
import Section from './Section';

const blocks: any = { profile: Profile, section: Section }

const block = (content: any) => {
    let name: string;

    if (content.sys.contentType.sys.id === 'assembly') {
        name = `${(content.fields.layout)}`;
    }
    else {
        name = content.sys.contentType.sys.id;
    }
    return name
}

type FactoryProps = {
    content: any;
    detail?: Boolean;
}

const Factory = (props: FactoryProps) => {
    const { content, detail } = props;
    const name: string = block(content)
    console.log(name)
    return blocks[name]({ content, detail })
}

type LayoutProps = {
    content: {
        fields: {
            layout: string;
        }
    };
    children: JSX.Element;
}

const Layout = (props: LayoutProps) => {
    const { content, children } = props;

    if (content.fields.layout === 'Grid') {
        return (
            <Grid container spacing={2}>
                {children}
            </Grid>
        )
    }
    else {
        return children
    }
}

const Renderer = (props: any) => {
    const { content } = props;

    return (
        <>
            {content.sys.contentType.sys.id === 'assembly'
                ?
                <Layout content={content}>
                    {content.fields.references.map((block: any, index: number) =>
                        <Factory key={index} content={block} />
                    )}

                </Layout>
                :
                <Factory content={content} detail={true} />
            }
        </>
    )
}

export default Renderer;