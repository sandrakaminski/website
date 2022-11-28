import Detail from './Detail';
import Summary from './Summary';
import type { BlockProps } from '@/shared';

const Article = (props: BlockProps) => {
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

