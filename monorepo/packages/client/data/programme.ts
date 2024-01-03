export interface Programme {
    day: string;
    title: string;
    startsAt: string;
    endsAt: string;
    venue: string;
    anchor?: string;
    isTakingPlace: boolean;
}

export const programmes: Programme[] = [
    {
        day: 'Monday',
        title: 'Marriage Conselling',
        startsAt: '17:00',
        endsAt: '18:00',
        venue: 'church',
        anchor: 'church',
        isTakingPlace: false
    },
    {
        day: 'Tuesday',
        title: 'House Fellowship',
        startsAt: '17:00',
        endsAt: '18:00',
        venue: 'Online',
        anchor: 'Pastor B. Bervall',
        isTakingPlace: false
    },
    {
        day: 'Wednesday',
        title: 'Bible Study',
        startsAt: '17:00',
        endsAt: '18:00',
        venue: 'Online',
        anchor: 'Pastor B. Bergvall',
        isTakingPlace: true
    },
    {
        day: 'Thursday',
        title: 'The Power of Marriage as Described By The Bible',
        startsAt: '2023-10-15',
        endsAt: '2023-10-15',
        venue: 'church',
        anchor: undefined,
        isTakingPlace: false
    },
    {
        day: 'Friday',
        title: 'Prayer Meeting',
        startsAt: '17:00',
        endsAt: '18:00',
        venue: 'Online',
        anchor: undefined,
        isTakingPlace: true
    },
    {
        day: 'Saturday',
        title: 'School of Disciples',
        startsAt: '17:00',
        endsAt: '18:00',
        venue: 'church',
        anchor: 'Pastor B. Bergvall',
        isTakingPlace: false
    },
    {
        day: 'Sunday',
        title: 'Church Service',
        startsAt: '14:00',
        endsAt: '17:00',
        venue: 'Main Church',
        anchor: 'Pastor B. Bergvall',
        isTakingPlace: true
    }
];
