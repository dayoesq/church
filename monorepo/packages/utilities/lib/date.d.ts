export declare class CustomDate {
    static getDay(date: string): number;
    static getMonth(date: string, options?: 'long' | 'short'): string;
    static getHours(date: string): number;
    static getMinutes(date: string): string;
    static getFormat(date: string): "pm" | "am";
    static getYear(date: string, options?: 'numeric' | '2-digit'): string;
    static formatCustomDate(date: string): string;
    static formatDate(date: string): string;
    static formatDateWithDay(date: string): string;
}
