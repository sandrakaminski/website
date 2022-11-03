import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import About from './About';
import Section from './Section';

const blocks: any = { About, Section }

const block = (content: any) => {
    let name: string;

    if (content.sys.contentType.sys.id === 'assembly') {
        name = `${(content.fields.layout)}`;
    }
    else {
        name = content.sys.contentType.sys.id;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

type FactoryProps = {
    content: any;
    detail?: Boolean;
}

const Factory = (props: FactoryProps) => {
    const { content, detail } = props;
    const name: string = block(content)
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