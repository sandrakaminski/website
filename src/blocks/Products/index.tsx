import Detail from './Detail';
import Summary from './Summary';
import { BlockProps } from '@/types';

const Products = (props: BlockProps) => {
    const { content, detail } = props;
    return (
        <>
            {detail
                ? <Detail content={content} />
                : <Summary content={content} />
            }
        </>
    );
}
export default Products; 