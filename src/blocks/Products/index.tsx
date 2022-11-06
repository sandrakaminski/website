import Detail from './Detail';
import Summary from './Summary';

export const Products = ({ content, detail }: any) => {

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