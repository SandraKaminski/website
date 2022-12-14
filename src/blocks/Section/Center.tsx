import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';

import Resource from './Resource';
import type { Content, ResourceType } from './SectionTypes';
import LoadingImage from '@/components/LoadingImage';
import { SectionMarkDown } from '@/components/Markdown';

export const Center = (props: Content) => {
    const { content } = props;

    return (
        <>
            {content?.fields.image?.fields.file.url &&
                <LoadingImage
                    skeletonheight={"50vh"}
                    sx={{ width: '100%', height: 'auto' }}
                    src={content.fields.image.fields.file.url}
                    alt={content.fields.image.fields.title}
                />
            }
            {content?.fields.headline &&
                <Typography align="center" variant="h2" sx={{ pt: { xs: 2, md: 4 }, my: 2 }}>
                    {content.fields.headline}
                </Typography>
            }
            {content?.fields.resources?.map((item: ResourceType, index: number) => (
                <Stack key={index} justifyContent="center" alignContent="center" sx={{ p: 2 }}>
                    <Typography align="center" variant="h3">
                        {item.fields.headline}
                    </Typography>
                    <Box sx={{ pt: 4 }}>
                        <Resource resource={item} />
                    </Box>
                </Stack>
            ))}
            <Stack justifyContent="center" direction="column" alignItems="center" spacing={2} sx={{ pb: { xs: 2, md: 4 }, color: 'GrayText' }}>
                <ReactMarkdown components={SectionMarkDown} >
                    {content?.fields.body}
                </ReactMarkdown>
                {content?.fields.ctaLabel &&
                    <Button href={content.fields.ctaSlug} variant="contained" sx={{ mt: 4, mb: 4 }}>
                        {content.fields.ctaLabel}
                    </Button>
                }
            </Stack>
        </>
    )
}

export default Center;