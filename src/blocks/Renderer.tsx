import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import ImageContainer from './ImageContainer';
import Profile from './Profile';
import Section from './Section';
import Article from './Article';

const blocks: any = {
    profile: Profile,
    section: Section,
    article: Article,
    imageContainer: ImageContainer
}

type FactoryProps = {
    content: any;
    detail?: Boolean;
}

const Factory = (props: FactoryProps) => {
    const { content, detail } = props;
    const name: string = content.sys.contentType.sys.id;
    return blocks[name]({ content, detail })
}

const Renderer = (props: any) => {
    const { content } = props;

    return (
        <Box sx={{ my: 4 }}>
            {content.sys.contentType.sys.id === 'assembly'
                ?
                <>
                    {content.fields.layout === 'Grid'
                        ?
                        <Grid container spacing={2}>
                            {content.fields.references.map((block: any, index: number) =>
                                <Grid xs={12} sm={6} md={4} key={index}>
                                    <Factory content={block} />
                                </Grid>
                            )}
                        </Grid>
                        :
                        <Box>
                            {content.fields.references.map((block: any, index: number) =>
                                <Factory key={index} content={block} />
                            )}
                        </Box>
                    }
                </>
                :
                <Factory detail={true} content={content} />
            }
        </Box>
    )
}

export default Renderer;