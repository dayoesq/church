export interface Blog {
    title: string;
    author: string;
    postedOn: string;
    imageUrl: string;
    comments: string[];
}

export const blogs: Blog[] = [
    {
        title: 'The Power of Marriage as Described By The Bible sdkshdjsdkjbfk',
        author: 'John Smith',
        postedOn: '2023-10-15',
        imageUrl: '/images/worship.jpg',
        comments: [
            'This is really good',
            'Thank you for this article',
            'The spirit of God is one'
        ]
    },
    {
        title: 'Faith Without Work is Death',
        author: 'Emily Johnson',
        postedOn: '2023-10-20',
        imageUrl: '/images/worship.jpg',
        comments: [
            'This is really good',
            'Thank you for this article',
            'The spirit of God is one'
        ]
    },
    {
        title: 'Jesus, the Saviour',
        author: 'David Brown',
        postedOn: '2023-10-25',
        imageUrl: '/images/worship.jpg',
        comments: ['Who can stand against the Lord', 'Awesome God']
    },
    {
        title: 'God is Good',
        author: 'Sarah Davis',
        postedOn: '2023-10-27',
        imageUrl: '/images/worship.jpg',
        comments: []
    }
];
