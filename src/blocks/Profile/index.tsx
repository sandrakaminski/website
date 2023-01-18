import Detail from './Detail';
import Summary from './Summary';
import type { BlockProps } from '@/types';

const Profile = (props: BlockProps) => {
    const { contentEntry, detail } = props;

    return (
        <>
            {detail === true
                ? <Detail contentEntry={contentEntry} />
                : <Summary contentEntry={contentEntry} />
            }
        </>
    )
}

export default Profile