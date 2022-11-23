import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import Resource from './Resource';
import type { Content, ResourceType } from './SectionTypes';

export const Column = (props: Content) => {
    const { content } = props;

    return (
        <Box sx={{ p: 5 }}>
            <Typography align="center" gutterBottom variant="h3">
                    {content.fields.headline}
                </Typography>
            <Grid container>
                {content.fields.resources.map((item: ResourceType, index: number) => (
                    <Grid key={index} xs={12} md={6} >
                        <Typography align="center" variant="h2" sx={{ p: 4 }}>
                            {item.fields.headline}
                        </Typography>
                        <Resource resource={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Column;
