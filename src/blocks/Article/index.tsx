import Summary from './Summary';
import { BlockProps } from '../../shared';


export const Article = (props: BlockProps) => {
    const { content, detail } = props;
    console.log(content)

    return (
        <>
            {detail === true
                ? <>
                    hello world</>
                : <Summary content={content} />
            }
        </>
    )
}
export default Article;