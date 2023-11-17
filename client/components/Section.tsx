import React from 'react';

type SectionProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};
export default function Section({ title, children, className }: SectionProps) {
    return (
        <section className={`my-20 py-8 ${className}`}>
            <h1 className='text-4xl my-10 uppercase text-center md:text-4xl lg:text-4xl xl:text-5xl'>{title}</h1>
            {children}
        </section>
    );
}
