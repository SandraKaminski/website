import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import type { Content, ResourceType } from './SectionTypes';
import { SectionMarkDown } from '@/shared';

export const Left = (props: Content) => {
    const { content } = props;
    console.log(content)
    return (
        <Grid container direction="row" spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={6}>
                {content.fields.image?.fields.file.url &&
                    <CardMedia
                        loading="lazy"
                        sx={{ width: "100%", height: 'auto' }}
                        component="img"
                        src={content.fields.image.fields.file.url}
                        alt={content.fields.image.fields.title}
                    />
                }
            </Grid>
            <Grid item xs={12} sm={6} >
                <Typography align="center" variant="h3" >
                    {content.fields.headline}
                </Typography>
                {content.fields.resources?.map((item: ResourceType, index: number) => (
                    <Box key={index} justifyContent="center" alignContent="center" sx={{ p: 4 }}>
                        {item.fields.headline &&
                        <Typography align="center" variant="h2" sx={{ p: 2 }}>
                            {item.fields.headline}
                        </Typography>
                        }
                        <Resource resource={item} />
                    </Box>
                ))}
            </Grid>
            <Container maxWidth="sm">
                <ReactMarkdown components={SectionMarkDown} >
                    {content.fields.body}
                </ReactMarkdown>
            </Container>
        </Grid >
    )
}
export default Left;