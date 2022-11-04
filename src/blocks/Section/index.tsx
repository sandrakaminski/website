import Column from './Column';
import Center from './Center';
import Right from './Right';
import Left from './Left';

type Content = {
    content: any
}

export const Section = (props: Content) => {
    const { content } = props;
console.log(content)
    console.log(content.fields.sectionType)
    
    switch (content.fields.sectionType) {
        case "Center":
            return <Center content={content} />
        case "Right":
            return <Right content={content} />
        case "Left":
            return <Left content={content} />
        // case "Center":
        //     return <Center content={content} />
        default:
            return <Center content={content} />
    }
}
export default Section;

