

import { useCallback, useEffect } from 'react';

// import Cookies from 'universal-cookie';
// import packageInfo from '../package.json';
import {
    camelCasePropertyNameResolver,
    DeliveryClient,
} from '@kontent-ai/delivery-sdk';

const projectId = import.meta.env.VITE_KONTENT_PROJECT_ID;
const previewApiKey = import.meta.env.VITE_PREVIEW_API_KEY;

// const client = new DeliveryClient({ projectId: projectId, propertyNameResolver: camelCasePropertyNameResolver, });

interface ConfigProps {
    name?: string | any
    getData: (data: any) => void
}

export const getKontentData = async (props: ConfigProps) => {
    const { name, getData } = props;

    const get = useCallback(async () => {
        // const response = await client.items().type('assembly').toPromise()
        try {
            const response = await fetch(`https://preview-deliver.kontent.ai/${projectId}/items/${name}`, {
                headers: {
                    'Authorization': `Bearer ${previewApiKey}`
                }
            })
            const kontentData = await response.json()
            console.log("DATA", kontentData?.item?.elements)
            getData(kontentData?.item?.elements)
        }
        catch (error) {
            console.log(error)
        }

    }, [name, getData])

    useEffect(() => {
        get()
    }, [get])
}
export default getKontentData; 