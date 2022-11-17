import Center from './Center';
import Column from './Column';
import Left from './Left';
import Right from './Right';
import type { Content } from './SectionTypes';

export const Section = (props: Content) => {
    const { content } = props;

    switch (content.fields.sectionType) {
        case "Center":
            return <Center content={content} />
        case "Right":
            return <Right content={content} />
        case "Left":
            return <Left content={content} />
        case "Column":
            return <Column content={content} />
        default:
            return <Center content={content} />
    }
}
export default Section;