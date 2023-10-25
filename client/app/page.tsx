import Image from 'next/image';
import Button from './components/Button';
import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
                <Button label='Hello!' type='button'>
                    <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                        <LockClosedIcon
                            className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                            aria-hidden='true'
                        />
                    </span>
                    Sign in
                </Button>
            </div>
        </main>
    );
}
