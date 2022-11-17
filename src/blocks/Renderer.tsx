import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Stack from '@mui/material/Stack';
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
    const name: string = content && content.sys.contentType.sys.id;

    if (!content || !name) {
        return <Outline />
    }
    return blocks[name]({ content, detail })
}

const Renderer = (props: FactoryProps) => {
    const { content } = props;

    return (
        <Box sx={{ my: 4 }}>
            {content && content.sys.contentType.sys.id === 'assembly'
                ?
                <>
                    {content.fields.layout === 'Grid'
                        ?
                        <GridLayout content={content} />
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

const GridLayout = (props: any) => {
    const { content } = props;
    const [activeStep, setActiveStep] = useState<number>(0);
    const maxSteps = content.fields.references.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Grid sx={{ display: { xs: 'none', sm: 'flex' } }} justifyContent={{ xs: "center", sm: 'flex-start' }} container spacing={2}>
                {content.fields.references.map((block: any, index: number) =>
                    <Grid sx={{ maxWidth: { xs: 400 } }} xs={12} sm={6} md={4} key={index}>
                        <Factory content={block} />
                    </Grid>
                )}
            </Grid>
            <Stack spacing={2} sx={{ display: { xs: 'block', sm: 'none' } }} >
                <Factory content={content.fields.references[activeStep]} />
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            Back
                        </Button>
                    }
                />
            </Stack>

        </>
    )
}