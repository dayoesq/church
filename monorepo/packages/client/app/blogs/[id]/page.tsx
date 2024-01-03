import { getById } from '@/util/requests/http-requests';

export default async function BlogDetailsPage({
    params
}: {
    params: { id: number };
}) {
    const { id } = params;
    const post = await getById(id);

    return (
        <div className=' text-black'>
            <h1 className='text-3xl'>{post?.title}</h1>
            <div className='h-40'>
                <p>{post?.comments}</p>
            </div>
        </div>
    );
}
