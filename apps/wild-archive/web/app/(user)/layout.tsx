import type { Metadata } from 'next';
import '../globals.css';
import LayoutWrapper from '@/components/route/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Wild Archive',
  description: 'Wild Archive',
};

export default function RootLayout({
  children,
  left,
  right,
  main,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
  main: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <div>
      <LayoutWrapper left={left} right={right} main={main} />
      <div>{authModal}</div>
      {/* <Toaster /> */}
    </div>
  );
}
