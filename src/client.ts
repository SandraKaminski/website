import { useEffect, useState } from 'react';

import { createClient, ContentfulClientApi, EntryCollection } from 'contentful';

const spaceId: string = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const deliveryApiToken: string = import.meta.env.VITE_DELIVERY_TOKEN;
const environment: string = import.meta.env.VITE_ENVIRONMENT;

export type MenuItemType = {
    fields: {
        name: string;
        slug: string;
    }
}

type Response = {
    items: {
        fields: {
            references: {
                name: string;
                slug: string;
            }
        }
    }[]
}

type Menu = {
    menuItems: MenuItemType[] | null
    error: null | {
        status: number;
        msg: string;
    };
}

export const useMenu = () => {
    const [menu, setMenu] = useState<Menu>({ menuItems: null, error: null });

    useEffect(() => {
        const fetch = async () => {
            try {
                const resp: EntryCollection<any[] | any> = await client.getEntries({ content_type: 'assembly', 'fields.slug': 'site-root', include: 1 });
                setMenu({ menuItems: resp.items[0].fields.references, error: null });
            }
            catch (e) {
                console.error("content failed to render", e)
                setMenu({ menuItems: null, error: { status: 500, msg: 'An issue occurred while menu items.' } });
            }
        }
        fetch();
    }, []);

    return menu
}

type UseView = {
    type: string;
    slug: string;
}

type View = {
    content?: any;
    error: null | {
        status: number;
        msg: string;
    };
}

export const useView = (props: UseView) => {
    const { type, slug } = props
    const [view, setView] = useState<View>({ content: null, error: null });

    // seperates the slug from the content type 
    // only add or change this if the content type is not the same as the slug
    let contentType: string
    if (type === 'about') {
        contentType = 'profile'
    }
    else if (type === 'shop') {
        contentType = 'product'
    }
    else if (type === 'inspiration') {
        contentType = 'article'
    }
    else if (type === 'blog') {
        contentType = 'article'
    }
    else {
        contentType = type
    }

    useEffect(() => {
        const fetch = async (contentType: string, slug: string) => {
            try {
                const getContent = async () => {
                    const resp: Response = await client.getEntries({ content_type: contentType, 'fields.slug': slug, include: 3 }); //locale,
                    if (resp?.items.length > 0) {
                        return resp?.items[0];
                    }
                }
                const resp = await getContent();
                if (resp) {
                    setView({ content: resp, error: null });
                } else {
                    setView({ content: null, error: { status: 404, msg: 'No matching content' } });
                }
            } catch (e) {
                setView({ content: null, error: { status: 500, msg: 'An issue occurred while fetching page content.' } });
            }
        };

        fetch(contentType, slug);
    }, [contentType, slug]);

    return view
}

const client: ContentfulClientApi = createClient({
    space: spaceId,
    environment: environment,
    accessToken: deliveryApiToken,
    host: 'https://cdn.contentful.com',
    removeUnresolved: true
})