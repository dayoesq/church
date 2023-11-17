import { Testimonial } from '@/data/testimonials';
import Image from 'next/image';

export default function TestimonialCard({ ...props }: Testimonial) {
    return (
        <article className='flex flex-col w-96 border p-4 rounded-lg text-gray-500'>
            <p className='my-2 italic'>{`"${props.quote}"`}</p>
            <div className='flex items-center'>
                <div className='shrink-0 w-16 h-16'>
                    <Image
                        src={props.imageUrl}
                        alt='Author Image'
                        className='rounded-full object-cover w-full h-full'
                        width={100}
                        height={100}
                        priority
                        quality={100}
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='ml-4 font-bold'>{props.author}</p>
                    <p className='ml-4'>{props.membership}</p>
                </div>
            </div>
        </article>
    );
}
