import * as React from 'react';
import Image from 'next/image';
import { FaCalendarDays } from 'react-icons/fa6';
import { CustomDate } from '@/util/date';
import { Event } from '@/types/event';

type EventProps = {
    imageHeight?: number;
    imageWidth?: number;
    className?: string;
    imageStyle?: React.CSSProperties;
} & Event;

export default function EventListItem({ ...props }: EventProps) {
    return (
        <li
            className={`relative flex justify-center py-8 leading-8 border-t-2 border-gray-100 max-w-4xl flex-col md:flex-row md:justify-between ${props.className}`}
        >
            <p className='absolute -top-4 pr-4 bg-white font-bold'>
                {CustomDate.getMonth(props.startsAt, 'long')}
            </p>
            <div>
                <p className='uppercase text-sm'>
                    {CustomDate.getMonth(props.startsAt)}
                </p>
                <span className='uppercase font-bold text-2xl'>1</span>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <FaCalendarDays className='h-4 w-4 fill-slate-400 mr-1' />
                    <p className='text-gray-500 md:text-sm'>
                        {CustomDate.formatCustomDate(props.startsAt)} {'-'}
                    </p>
                    <p className='text-gray-500 ml-1 md:text-sm'>
                        {CustomDate.formatCustomDate(props.startsAt)}
                    </p>
                </div>
                <h1 className='uppercase font-bold '>{props.title}</h1>
                <p className='uppercase font-medium md:text-sm'>
                    {props.location}
                </p>
                <p className='text-2xl text-gray-500 md:text-sm'>{`${
                    props.isFree ? 'Free' : props.cost + '€'
                }`}</p>
            </div>
            <div className='w-96 shrink-0'>
                <Image
                    src={props.imageSource}
                    alt='Bible Image'
                    className='rounded-lg w-80 h-40'
                    width={props.imageWidth || 100}
                    height={props.imageHeight || 100}
                    priority
                    quality={100}
                    style={props.imageStyle}
                />
            </div>
        </li>
    );
}
