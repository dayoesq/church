export function getDate(date: string) {
    return date && new Date(date).getDate();
}

export function getMonth(date: string) {
    return (
        date && new Date(date).toLocaleDateString('en-US', { month: 'short' })
    );
}
