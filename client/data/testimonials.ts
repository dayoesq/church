export interface Testimonial {
    id: number;
    author: string;
    quote: string;
    imageUrl: string;
    membership: 'member' | 'visitor';
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        author: 'Pastor B. Bergvall',
        quote: 'I felt pretty much at home and in the presence of God. Very angelic worship coupled extremely rich bread of life. I will definitely come back.',
        imageUrl: '/images/bible-the-way.jpg',
        membership: 'member'
    },
    {
        id: 2,
        author: 'Pastor B. Bergvall',
        quote: 'I felt pretty much at home and in the presence of God. Very angelic worship coupled extremely rich bread of life. I will definitely come back.',
        imageUrl: '/images/bible-the-way.jpg',
        membership: 'member'
    },
    {
        id: 3,
        author: 'Dayo Oladapo',
        quote: 'For a complete 12 years, missing the Sunday School was like missing a delicious meal. Being part of this awesome group had blessed me tremendously. In fact the Lord has used me greatly through the church.',
        imageUrl: '/images/bible-the-way.jpg',
        membership: 'member'
    },
    {
        id: 4,
        author: 'Dr. M. Kwazema',
        quote: 'I felt pretty much at home and in the presence of God. Very angelic worship coupled extremely rich bread of life. I will definitely come back.',
        imageUrl: '/images/bible-the-way.jpg',
        membership: 'member'
    }
];
