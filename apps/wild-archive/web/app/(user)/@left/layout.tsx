import { Toaster } from "@/components/ui/sonner";

export default function LeftLayout({ children }: { children: React.ReactNode }) {

    return <div>{children}<Toaster /></div>;
}