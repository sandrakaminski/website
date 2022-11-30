type DateString = {
    dateString: string;
}

export const DateFormatter = (props: DateString) => {
    const { dateString } = props;
    const d = new Date(dateString);
    const year = d.getFullYear(); 
    const date = d.getDate(); 
    const monthIndex = d.getMonth(); 
    const monthName = months[monthIndex]; 
    const formatted = ` ${date} ${monthName} ${year}`; 

    const uploaded = formatted.toString();
    return <>{uploaded}</>
}

export default DateFormatter;

const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 