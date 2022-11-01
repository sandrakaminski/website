import { useCallback, useEffect } from 'react';
import { createClient } from 'contentful';

const spaceId: string = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const deliveryApiToken: string = import.meta.env.VITE_DELIVERY_TOKEN;
const environment: string = import.meta.env.VITE_ENVIRONMENT;

interface ConfigProps {
    name?: string
    setData: (data: any) => void
}

type Response = {
    items: any[]
}

export const getData = async (props: ConfigProps) => {
    const { name, setData } = props;

    const get = useCallback(async () => {
        try {
            const resp: Response = await client.getEntries({ content_type: 'assembly', 'fields.slug': name });
            setData(resp.items[0].fields.references);
        }
        catch (error) {
            console.log(error)
        }

    }, [name, setData])

    useEffect(() => {
        get()
    }, [get])
}
export default getData;

const client = createClient({
    space: spaceId,
    environment: environment,
    accessToken: deliveryApiToken,
    host: 'https://cdn.contentful.com',
    removeUnresolved: true
})