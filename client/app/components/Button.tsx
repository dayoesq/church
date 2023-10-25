import { HTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined;
    label: string;
    className?: HTMLAttributes<HTMLButtonElement>;
    style?: HTMLAttributes<HTMLButtonElement>;
    children?: ReactNode;
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
            } group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
            {children}
        </button>
    );
}
