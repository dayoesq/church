import * as React from 'react';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    style?: React.HTMLAttributes<HTMLButtonElement>;
    children?: React.ReactNode;
};

export default function Buton({
    type,
    className,
    style,
    children
}: ButtonProps) {
    return (
        <button
            disabled
            type={type}
            style={style}
            className={`${className && className} ${
                style && style
            } py-2 px-4 border 
            border-transparent 
            text-sm font-medium 
            rounded-md
             text-white 
             cursor-pointer`}
        >
            {children}
        </button>
    );
}
