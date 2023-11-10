import Link from 'next/link';
import React from 'react';

type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    linkType?: 'internal' | 'anchor';
    href?: any;
    // onClick?: React.DOMAttributes<HTMLButtonElement>;
};

export default function Button({
    type = 'button',
    className,
    style,
    children,
    linkType,
    href
}: // onClick
ButtonProps) {
    const commonButtonProps = {
        type,
        style,
        className: `${className} ${style} inline-block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white cursor-pointer tracking-wider`
    };

    if (linkType === 'anchor') {
        return (
            <a href={href} {...commonButtonProps}>
                {children}
            </a>
        );
    }

    if (linkType === 'internal') {
        return (
            <Link href={href} {...commonButtonProps}>
                {children}
            </Link>
        );
    }

    return <button {...commonButtonProps}>{children}</button>;
}
