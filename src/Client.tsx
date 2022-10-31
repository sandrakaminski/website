

import { useCallback, useEffect } from 'react';

const projectId = import.meta.env.VITE_KONTENT_PROJECT_ID;
const previewApiKey = import.meta.env.VITE_PREVIEW_API_KEY;

interface ConfigProps {
    name?: string | undefined
    getData: (data: any) => void
}

export const getKontentData = (props: ConfigProps) => {
    const { name, getData } = props;

    const get = useCallback(async () => {
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