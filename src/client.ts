import { useEffect, useState } from 'react';
import { createClient } from 'contentful';

const spaceId: string = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const deliveryApiToken: string = import.meta.env.VITE_DELIVERY_TOKEN;
const environment: string = import.meta.env.VITE_ENVIRONMENT;

type Response = {
    items: any[]
}

export const useMenu = () => {
    const [menu, setMenu] = useState<Object>({ menuItems: null, error: null });

    useEffect(() => {
        const fetch = async () => {
            try {
                const resp: Response = await client.getEntries({ content_type: 'assembly', 'fields.slug': 'site-root', include: 1 });
                setMenu({ menuItems: resp.items[0].fields.references, error: null });
            }
            catch (e) {
                console.log("Epic fail", e)
                setMenu({ menuItems: null, error: { status: 500, msg: 'An issue occurred while menu items.' } });
            }
        }
        fetch();
    }, []);

    return menu
}

type UseView = {
    type: any
    slug: any
}

export const useView = (props: UseView) => {
    const { type, slug } = props
    const [view, setView] = useState<any>({ content: null, error: null });

    useEffect(() => {
        const fetch = async (type: Event, slug: Event) => {
            try {
                // get content for view or preview
                const getContent = async () => {
                    const resp = await client.getEntries({ content_type: type, 'fields.slug': slug, include: 3 }); //locale,
                    if (resp.items.length > 0) {
                        return resp.items[0];
                    }
                }

                const resp = await getContent();
                if (resp) {
                    setView({ content: resp, error: null });
                } else {
                    setView({ content: null, error: { status: 404, msg: 'No matching content' } });
                }
            } catch (e) {
                // console.error(e);
                setView({ content: null, error: { status: 500, msg: 'An issue occurred while fetching page content.' } });
            }
        };

        fetch(type, slug);
    }, [type, slug]);

    return view
}

const client = createClient({
    space: spaceId,
    environment: environment,
    accessToken: deliveryApiToken,
    host: 'https://cdn.contentful.com',
    removeUnresolved: true
})