import React from 'react';

type DateString = {
    dateString: string;
}

export const DateFormatter = (props: DateString) => {
    const { dateString } = props;
    const d = new Date(dateString);
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[monthIndex]
    const dayName = days[d.getDay()]
    const formatted = `${dayName}, ${date} ${monthName} ${year}`

    const uploaded = formatted.toString();
    return <>{uploaded}</>
}

export default DateFormatter;

const days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']