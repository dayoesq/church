export interface Donation {
    id: number;
    firstName?: string;
    lastName?: string;
    isAnonymous: boolean;
    email: string;
    amount: number;
    projectId: number;
}

export const events: Donation[] = [
    {
        id: 1,
        firstName: 'Sola',
        lastName: 'Alison',
        isAnonymous: false,
        email: 'sola@example.fi',
        amount: 20,
        projectId: 1
    },
    {
        id: 1,
        firstName: 'Mark',
        lastName: 'Zuckerberg',
        isAnonymous: false,
        email: 'mark@example.fi',
        amount: 20,
        projectId: 1
    },
    {
        id: 2,
        firstName: '2023-03-02',
        lastName: '2023-10-15',
        isAnonymous: false,
        email: 'sola@example.fi',
        amount: 20,
        projectId: 1
    },
    {
        id: 3,
        firstName: 'John',
        lastName: '',
        isAnonymous: false,
        email: 'sola@example.fi',
        amount: 20,
        projectId: 1
    },
    
];
