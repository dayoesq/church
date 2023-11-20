'use client';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PrimaryHeaders from '@/components/PrimaryHeaders';
import { useEffect, useState } from 'react';
import { events } from '@/data/event';
import EventListItem from '@/components/EventListItem';

export default function EventsPage() {
    const [eventsPosts, setEventsPosts] = useState<any[]>([]);

    useEffect(() => {
        if (eventsPosts.length === 0) {
            setEventsPosts(events);
        }
    }, [eventsPosts]);

    return (
        <>
            <Navigation />
            <div className='m-auto max-w-7xl my-20 p-8'>
                <PrimaryHeaders title='Events' subTitle='Up-coming events' />
                <ul className='flex justify-center flex-col mt-20'>
                    {eventsPosts &&
                        eventsPosts.length > 0 &&
                        eventsPosts.map(event => (
                            <EventListItem
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                cost={event.cost}
                                location={event.location}
                                startsAt={event.startsAt}
                                endsAt={event.endsAt}
                                isFree={event.isFree}
                                imageSource={event.imageSource}
                                
                            />
                        ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}
