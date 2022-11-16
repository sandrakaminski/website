import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Article from './Article';
import ImageContainer from './ImageContainer';
import Products from './Products';
import Profile from './Profile';
import Section from './Section';
import ContactUs from '@/components/ContactUs';
import Outline from '@/components/Outline';

type Blocks = {
    [key: string]: any;
}

const blocks: Blocks = {
    profile: Profile,
    section: Section,
    article: Article,
    imageContainer: ImageContainer,
    product: Products
}

type FactoryProps = {
    content: {
        fields: {
            type: string;
            references: any[];
            layout: string;
        }
        sys: {
            contentType: {
                sys: {
                    id: string;
                }
            }
        }
    };
    detail?: boolean;
}

const Factory = (props: FactoryProps) => {
    const { content, detail } = props;
    const name: string = content.sys.contentType.sys.id;

    if (!content || !name) {
        return <Outline />
    }
    return blocks[name]({ content, detail })
}

const Renderer = (props: FactoryProps) => {
    const { content } = props;

    return (
        <Box sx={{ my: 4 }}>
            {content.sys.contentType.sys.id === 'assembly'
                ?
                <>
                    {content.fields.layout === 'Grid'
                        ?
                        <Grid justifyContent={{ xs: "center", sm: 'flex-start' }} container spacing={2}>
                            {content.fields.references.map((block, index) =>
                                <Grid sx={{ maxWidth: { xs: 400 } }} xs={12} sm={6} md={4} key={index}>
                                    <Factory content={block} />
                                </Grid>
                            )}
                        </Grid>
                        :
                        <Box>
                            {content.fields.references.map((block, index) =>
                                <Factory key={index} content={block} />
                            )}
                        </Box>
                    }
                </>
                :
                <Factory detail={true} content={content} />
            }
            <ContactUs />
        </Box>
    )
}

export default Renderer;