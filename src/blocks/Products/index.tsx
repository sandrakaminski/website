import Detail from './Detail';
import Summary from './Summary';

const Products = (props: any) => {
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