"use client";
import Menu from "@/components/route/Menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ac, Session } from "@/lib/auth-client";
import Link from "next/link";

export default function Default() {
    const sessionInfo = ac.useSession();

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <Menu />
            </div>
            <section id="user" className="w-full">
                <Link href={sessionInfo.data ? "/profile" : "/auth"}>
                    <div className="inline-flex items-center gap-4 justify-start p-4 w-full border-t border-solid hover:bg-primary-foreground cursor-pointer">
                        <Avatar>
                            <AvatarFallback>{sessionInfo?.data?.user?.name?.substring(0, 2) ?? '?'}</AvatarFallback>
                        </Avatar>
                        <span>{sessionInfo?.data?.user?.name ?? '未登录'}</span>
                    </div>
                </Link>
            </section>
        </div>
    )
}