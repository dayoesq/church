import { Event } from '@/types/event';

export const events: Event[] = [
    {
        id: 1,
        startsAt: '2023-03-02',
        endsAt: '2023-10-15',
        title: 'In defence of marriage',
        isFree: true,
        cost: undefined,
        location: 'Turku',
        imageSource: '/images/worship.jpg'
    },
    {
        id: 2,
        startsAt: '2024-02-02',
        endsAt: '2024-02-08',
        title: 'A new beginning',
        isFree: false,
        cost: 20,
        location: 'New York',
        imageSource: '/images/worship.jpg'
    },
    {
        id: 3,
        startsAt: '2024-06-10',
        endsAt: '2024-06-15',
        title: 'Summer camp',
        isFree: false,
        cost: 200,
        location: 'Karina',
        imageSource: '/images/bible-the-way.jpg'
    }
];
