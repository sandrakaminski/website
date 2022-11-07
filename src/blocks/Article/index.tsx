import { BlockProps } from '../../shared';
import Detail from './Detail';
import Summary from './Summary';

export const Article = (props: BlockProps) => {
    const { content, detail } = props;

    return (
        <>
            {detail === true
                ? <Detail content={content} />
                : <Summary content={content} />
            }
        </>
    )
}
export default Article;