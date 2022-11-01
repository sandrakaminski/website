

import { useCallback, useEffect } from 'react';
import { createClient } from 'contentful';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID

const deliveryApiToken = "9pech2A_lP4MlSZDwNSzKneYCW1riVr4tC-n8J_Ix4Y"
const preview = "T5vZEfV8hvR8ASdKP6RHKIibn620oF-epl5Dpt7wiBE"

interface ConfigProps {
    name?: string | any
    setData: (data: any) => void
}

export const getData = async (props: ConfigProps) => {
    const { name, setData } = props;

    const get = useCallback(async () => {
        try {
            const resp = await client.getEntries({ content_type: 'assembly', 'fields.slug': name });
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
    environment: 'production',
    accessToken: deliveryApiToken
})