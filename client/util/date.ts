export class CustomDate {
    public static getDay(date: string) {
        return new Date(date).getDate();
    }
    public static getMonth(date: string, options: 'long' | 'short' = 'short') {
        return new Date(date).toLocaleString('en-US', { month: options });
    }
    public static getHours(date: string) {
        return new Date(date).getHours();
    }

    public static getMinutes(date: string) {
        return new Date(date).getMinutes().toString().padStart(2, '0');
    }
    public static getFormat(date: string) {
        return CustomDate.getHours(date) >= 12 ? 'pm' : 'am';
    }
    public static getYear(
        date: string,
        options: 'numeric' | '2-digit' = '2-digit'
    ) {
        return new Date(date).toLocaleString('en-US', { year: options });
    }

    static formatCustomDate(date: string): string {
        const formattedDate = `${CustomDate.getMonth(date)} ${CustomDate.getDay(
            date
        )}, ${CustomDate.getYear(date, 'numeric')} @${CustomDate.getHours(
            date
        )}:${CustomDate.getMinutes(date)}${CustomDate.getFormat(date)}`;

        return formattedDate;
    }
}
