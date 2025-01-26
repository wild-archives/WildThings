import type { Metadata } from 'next';
import '../globals.css';
import TopBar from '@/components/route/TopBar';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Wild Archive',
    description: 'Wild Archive',
};

export default function RootLayout({
    children,
    left,
    right,
    main,
    authModal
}: Readonly<{
    children: React.ReactNode;
    left: React.ReactNode;
    right: React.ReactNode;
    main: React.ReactNode;
    authModal: React.ReactNode;
}>) {
    return (
        <div>
            <div className='flex flex-col lg:flex-row justify-center min-h-screen w-full'>
                <div className='hidden lg:block lg:fixed lg:left-0 w-[375px] flex-shrink-0 border-r border-gray-200'>
                    {left}
                </div>
                <div className='flex flex-col flex-grow min-w-0 lg:pl-[375px]'>
                    <TopBar />
                    <div className='flex-grow'>
                        {main}
                    </div>
                    <div className='md:hidden'>
                        {right}
                    </div>
                </div>
                <div className='hidden md:block min-w-min flex-shrink-0 border-l border-gray-200'>
                    {right}
                </div>
            </div>
            <div>{authModal}</div>
            {/* <Toaster /> */}
        </div>
    );
}
