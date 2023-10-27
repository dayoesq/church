interface Blog {
    title: string;
    author: string;
    postedOn: string;
    imageUrl: string;
}

export const blogs: Blog[] = [
    {
        title: 'The Art of Programming',
        author: 'John Smith',
        postedOn: '2023-10-15',
        imageUrl: 'https://example.com/image1.jpg'
    },
    {
        title: 'Web Development Best Practices',
        author: 'Emily Johnson',
        postedOn: '2023-10-20',
        imageUrl: 'https://example.com/image2.jpg'
    },
    {
        title: 'Machine Learning Demystified',
        author: 'David Brown',
        postedOn: '2023-10-25',
        imageUrl: 'https://example.com/image3.jpg'
    },
    {
        title: 'The Power of Data Visualization',
        author: 'Sarah Davis',
        postedOn: '2023-10-27',
        imageUrl: 'https://example.com/image4.jpg'
    },
    {
        title: 'Cybersecurity in a Digital World',
        author: 'Michael Johnson',
        postedOn: '2023-10-30',
        imageUrl: 'https://example.com/image5.jpg'
    }
];
