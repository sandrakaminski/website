import { useEffect } from 'react'

const projectId = import.meta.env.VITE_KONTENT_PROJECT_ID
const previewApiKey = import.meta.env.VITE_PREVIEW_API_KEY

export const getKontentData = ({ name, getData }: any) => {
    useEffect(() => {
        const get = async () => {
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
                console.error(error)
            }
        }
        get()
    }, [getData])
}
export default getKontentData; 