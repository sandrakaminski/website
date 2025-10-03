import { JSX } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Resource from "./Resource";
import type { Content, ContentEntryProps, ResourceType } from "@/types";

export const Column = (props: ContentEntryProps<Content>): JSX.Element => {
    const { contentEntry } = props;

    return (
        <>
            {contentEntry && (
                <>
                    <Typography
                        data-testid="sectionHeadline"
                        id="sectionHeadline"
                        align="center"
                        gutterBottom
                        variant="h2">
                        {contentEntry.fields.headline}
                    </Typography>
                    <Grid container>
                        {contentEntry.fields.resources?.map(
                            (item: ResourceType, index: number) => (
                                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                                    <Typography
                                        data-testid="resourceHeadline"
                                        align="center"
                                        variant="h3"
                                        sx={{ pt: 4 }}>
                                        {item.fields.headline}
                                    </Typography>
                                    <Resource resource={item} />
                                </Grid>
                            )
                        )}
                    </Grid>
                </>
            )}
        </>
    );
};

export default Column;
