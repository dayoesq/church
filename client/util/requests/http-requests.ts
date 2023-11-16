import { BlogPost, blogs } from '@/data/blog';

export const getById = async (id: number) => {
    const data: BlogPost[] = blogs;
    return data.find(item => item.id === id);
};
