import Navigation from '@/components/Navigation';
import './globals.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import Footer from '@/components/Footer';

const ubuntu = Ubuntu({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700']
});

export const metadata: Metadata = {
    title: 'RCCG Grace Chapel, Turku',
    description:
        'Grace Chapel, Turku, is a member of the the Redeemed Christian Church of God worldwide.'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={ubuntu.className}>
                <Navigation />
                {children}
                <Footer />
            </body>
        </html>
    );
}
