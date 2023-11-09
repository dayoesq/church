export interface Event {
    id: number;
    startsAt: string;
    endsAt: string;
    title: string;
    isFree: boolean;
    cost: number | undefined;
    location: string;
    imageSource: string;
}
