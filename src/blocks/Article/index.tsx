import Summary from './Summary';
import Detail from './Detail';
import { BlockProps } from '../../shared';


export const Article = (props: BlockProps) => {
    const { content, detail } = props;
    console.log(content)

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