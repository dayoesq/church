export function getDate(date: string) {
    return date && new Date(date).getDate();
}

export function getMonth(date: string) {
    return (
        date && new Date(date).toLocaleDateString('en-US', { month: 'short' })
    );
}

export function getDay(date: string) {
    return (
        date && new Date(date).toLocaleDateString('en-US', { day: '2-digit' })
    );
}
export function getShortMonthAndFullYear(date: string) {
    return (
        date &&
        `${getMonth(date)}., ${new Date(date).toLocaleDateString('en-US', {
            year: 'numeric'
        })}`
    );
}

export function getFullDateWithTime(date: string) {
    return (
        date &&
        `${new Date(date).toLocaleTimeString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        })}`
    );
}
