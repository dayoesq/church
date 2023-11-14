import React from 'react';

type SectionProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};
export default function Section({ title, children, className }: SectionProps) {
    return (
        <section className={`my-20 py-8 ${className}`}>
            <h1 className='text-3xl my-10 uppercase text-center'>{title}</h1>
            {children}
        </section>
    );
}
