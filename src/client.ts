

import { useCallback, useEffect } from 'react';

import Cookies from 'universal-cookie';
import packageInfo from '../package.json';
import {
    camelCasePropertyNameResolver,
    DeliveryClient,
} from '@kontent-ai/delivery-sdk';

const projectId = import.meta.env.VITE_KONTENT_PROJECT_ID;
const previewApiKey = import.meta.env.VITE_PREVIEW_API_KEY;


const Client = new DeliveryClient({ projectId: projectId });

interface ConfigProps {
    name?: string | any
    getData: (data: any) => void
}

export const getKontentData = async (props: ConfigProps) => {
    const { name, getData } = props;

    // try {
    //     const resp = await Client.items().type(name)
    //     console.log(name, resp)
    // }
    // catch (error) {
    //     console.log(error)
    // }





    const get = useCallback(async () => {
        // try {
        //     const response = await Client.items().type(name).toPromise()
        //     console.log(name, response)
        // }
        // catch (error) {
        //     console.log(error)
        // }
        try {
            const response = await fetch(`https://preview-deliver.kontent.ai/${projectId}/items/${name}`, {
                headers: {
                    'Authorization': `Bearer ${previewApiKey}`
                }
            })
            const kontentData = await response.json()
            getData(kontentData)
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