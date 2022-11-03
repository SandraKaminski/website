import React from 'react';
import Box from '@mui/material/Box';
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


const Factory = (props: any) => {
    const { content, detail } = props;
    const name: string = block(content)
    return blocks[name]({ content, detail })
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