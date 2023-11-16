export interface BlogPost {
    id: number;
    title: string;
    author: string;
    postedOn: string;
    imageUrl: string;
    comments: string[];
    content?: string;
}

export const blogs: BlogPost[] = [
    {
        id: 1,
        title: 'The Power of Marriage as Recorded by the Bible',
        author: 'John Smith',
        postedOn: '2023-10-15',
        imageUrl: '/images/worship.jpg',
        comments: [
            'This is really good',
            'Thank you for this article',
            'The spirit of God is one'
        ],
        content:
            "God ordained marriage and that's why a man must cleave to a woman and become one"
    },
    {
        id: 2,
        title: 'Faith Without Work is Death',
        author: 'Emily Johnson',
        postedOn: '2023-10-20',
        imageUrl: '/images/worship.jpg',
        comments: [
            'This is really good',
            'Thank you for this article',
            'The spirit of God is one'
        ],
        content:
            'God is spirit and those who must worship him must do so in spirit and in truth. Without faith, it is impossible to please God.'
    },
    {
        id: 3,
        title: 'Jesus, the Saviour',
        author: 'David Brown',
        postedOn: '2023-10-25',
        imageUrl: '/images/worship.jpg',
        comments: ['Who can stand against the Lord', 'Awesome God'],
        content:
            'For God so loved the world that He gave His only-begotten son that whosoever believes in Him shall not perish but have everlasting life.'
    }
    // {
    //     title: 'God is Good',
    //     author: 'Sarah Davis',
    //     postedOn: '2023-10-27',
    //     imageUrl: '/images/worship.jpg',
    //     comments: []
    // }
];
