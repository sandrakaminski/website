import type { Image } from '../../shared';

export type ProfileType = {
    content: {
        fields: {
            slug?: string;
            title: string;
            name: string;
            headline: string;
            body: string;
            otherImages: Image[];
            image: Image
        }
    }
}
export default ProfileType;