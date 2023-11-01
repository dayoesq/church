export default function Footer() {
    return (
        <footer className='relative bg-[#161716d1] -mx-8 -my-8 h-96'>
            <div className='flex justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit text-white pb-4'>
                <div className='my-4'>
                    <h1 className='mb-4 uppercase'>Address</h1>
                    <p>Vähä-hamenkatu 12, 20398</p>
                    <p>Turku, Finland</p>
                </div>
            </div>
        </footer>
    );
}
