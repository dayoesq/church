export interface Audio {
    id: number;
    author?: string;
    title: string;
    genre: 'worship' | 'sermon' | 'praise' | 'sunday-school';

    audioUrl: string;
    deliveredOn?: string;
}

export const audios: Audio[] = [
    {
        id: 1,
        author: 'Pastor B. Bergvall',
        title: 'The Wages of Sin',
        genre: 'sermon',
        audioUrl: '/podcasts/random-praise.m4a',
        deliveredOn: '2023-10-26'
    },
    {
        id: 2,
        author: 'Pastor B. Bergvall',
        title: 'Jesus is Lord',
        genre: 'sermon',
        audioUrl: '/podcasts/random-praise.m4a',
        deliveredOn: '2023-10-26'
    },
    {
        id: 3,
        author: undefined,
        title: 'Light of the World',
        genre: 'worship',
        audioUrl: '/podcasts/random-praise.m4a',
        deliveredOn: '2023-10-26'
    }
];
