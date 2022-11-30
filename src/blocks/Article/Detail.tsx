import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { Embed } from 'hyvor-talk-react';
import ReactGA from 'react-ga4';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import type { ArticleType } from './ArticleType'
import DateFormatter from "@/components/DateFormatter";
import Trail from '@/components/Trail';
import { Markdown } from '@/shared';

const Detail = (props: ArticleType) => {
    const { content } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/about/${content.fields.author.fields.slug}`, { state: { data: 'about' } })
        ReactGA.event({
            category: 'About',
            action: `Read more about ${content.fields.name}`,
            label: content.fields.name
        });
    }

    return (
        <>
            <Trail current={content.fields.title} />
            <Stack sx={{ my: 4 }} spacing={2} justifyContent="center" alignItems="center">
                <Typography sx={{ my: 2, maxWidth: "md" }} variant="h1" align="center" >
                    {content.fields.headline}
                </Typography>
                <Stack
                    sx={{ my: 2 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2} >
                    <Typography variant="body1"  >
                        <DateFormatter dateString={content.fields.date} />
                    </Typography>
                    <FiberManualRecordIcon sx={{ height: 5, width: 5 }} />
                    <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => handleClick()} variant="body1">
                        {content.fields.author.fields.name}
                    </Link>
                </Stack>
                <Box sx={{ maxWidth: 600 }}>
                    {content.fields.coverImage ?
                        <CardMedia
                            loading="lazy"
                            component="img"
                            sx={{ width: '100%', height: 'auto', py: 4 }}
                            src={content?.fields.coverImage.fields.file.url}
                            alt={content.fields.coverImage.fields.title}
                        />
                        : <Skeleton sx={{ width: '100%', height: 450 }} />
                    }
                    <ReactMarkdown components={Markdown}>{content.fields.body}</ReactMarkdown>
                    {/* <Embed
                        websiteId={import.meta.env.VITE_HYVOR_WEBSITE}
                        id={content.fields.slug}
                    /> */}
                </Box>
            </Stack>
        </>
    )
}
export default Detail;