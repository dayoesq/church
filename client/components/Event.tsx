'use client';
import * as React from 'react';
import Image from 'next/image';
import { FaCalendarDays } from 'react-icons/fa6';
import { CustomDate } from '@/util/date';
import { Event } from '@/types/event';
import { useRouter } from 'next/navigation';

export type EventProps = {
    imageHeight?: number;
    imageWidth?: number;
    className?: string;
    imageStyle?: React.CSSProperties;
} & Event;

export default function Event({ ...props }: EventProps) {
    const router = useRouter();
    return (
        <div
            className={`flex justify-between cursor-pointer gap-6 p-4 ${props.className}`}
            onClick={() => router.push(`/events/${props.id}`)}
        >
            <div>
                <p className='font-bold text-3xl'>
                    {CustomDate.getDay(props.startsAt)}
                </p>
                <p className='text-gray-500'>
                    {CustomDate.getMonth(props.startsAt)}
                </p>
            </div>
            <div>
                <Image
                    src={props.imageSource}
                    alt='Bible Image'
                    className='rounded'
                    width={props.imageWidth || 100}
                    height={props.imageHeight || 100}
                    priority
                    quality={100}
                    style={props.imageStyle}
                />
                <div className='my-3'>
                    <h1 className='font-bold text-xl mb-2'>{props.title}</h1>
                    <div>
                        <h2 className='text-gray-500 font-bold mb-2'>
                            {props.location}
                        </h2>
                        <div className='flex items-center'>
                            <FaCalendarDays className='h-4 w-4 fill-slate-400 mr-1' />
                            <p>
                                <small>
                                    {CustomDate.formatCustomDate(
                                        props.startsAt
                                    )}{' '}
                                    -{' '}
                                    {CustomDate.formatCustomDate(props.endsAt)}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-2xl text-gray-500'>{`${
                props.isFree ? 'Free' : props.cost + '€'
            }`}</h1>
        </div>
    );
}
