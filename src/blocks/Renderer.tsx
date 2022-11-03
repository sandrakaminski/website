import React from 'react';
import Box from '@mui/material/Box';
import { Profile } from './Profile';
import Section from './Section';
// import { ContactUs } from './ContactUs';

const blocks: any = { profile: Profile, section: Section }

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




const Factory = (props: any) => {
    const { content } = props;
    const name: string = content.sys.contentType.sys.id
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(name)

    // if (name !== 'profile') {
    //     return
    // }
    // const Block = blocks[name]({ content });
    // const item = Block?.toString()
    // console.log(name.charAt(0).toUpperCase() + name.slice(1))

    return blocks[name]({ content })

}

const Renderer = (props: any) => {
    const { content } = props;

    return (
        <>

            {content.sys.contentType.sys.id === 'assembly'
                ?
                <>
                    {content.fields.references.map((block: any, index: number) =>
                        <Box key={index}   >
                            <Factory content={block} />
                        </Box>
                    )}

                </>
                :
                <Factory content={content} detail={true} />
            }
        </>
    )
}

export default Renderer;