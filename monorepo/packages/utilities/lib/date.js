export class CustomDate {
    static getDay(date) {
        return new Date(date).getDate();
    }
    static getMonth(date, options = 'short') {
        return new Date(date).toLocaleString('en-US', { month: options });
    }
    static getHours(date) {
        return new Date(date).getHours();
    }
    static getMinutes(date) {
        return new Date(date).getMinutes().toString().padStart(2, '0');
    }
    static getFormat(date) {
        return CustomDate.getHours(date) >= 12 ? 'pm' : 'am';
    }
    static getYear(date, options = '2-digit') {
        return new Date(date).toLocaleString('en-US', { year: options });
    }
    static formatCustomDate(date) {
        const formattedDate = `${CustomDate.getMonth(date)} ${CustomDate.getDay(date)}, ${CustomDate.getYear(date, 'numeric')} @${CustomDate.getHours(date)}:${CustomDate.getMinutes(date)}${CustomDate.getFormat(date)}`;
        return formattedDate;
    }
    static formatDate(date) {
        return (date &&
            new Date(date).toLocaleDateString('en-FI', {
                year: 'numeric',
                month: 'long'
            }));
    }
    static formatDateWithDay(date) {
        return (date &&
            new Date(date).toLocaleDateString('en-FI', {
                year: '2-digit',
                month: 'short',
                day: '2-digit'
            }));
    }
}
