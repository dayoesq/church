type PrimaryHeadersProps = {
    title: string;
    subTitle: string;
    className?: string;
};

export default function PrimaryHeaders({ ...props }: PrimaryHeadersProps) {
    return (
        <>
            <h1
                className={`${props.className} text-base font-semibold leading-7 text-indigo-600 uppercase`}
            >
                {props.title}
            </h1>
            <h2
                className={`${props.className} mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl`}
            >
                {props.subTitle}
            </h2>
        </>
    );
}
