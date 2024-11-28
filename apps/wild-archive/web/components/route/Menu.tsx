"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "我的 Archives" },
    { href: "/space", label: "我的主页" },
    { href: "/profile", label: "个人信息" },
    { href: "/account", label: "帐号安全" },
]

export default function Menu() {
    const pathName = usePathname()

    return (
        <>
            <section id="header" className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold">Wild Archive</h1>
            </section>
            <section id="menu">
                <ul className="flex flex-col hover:*:bg-primary-foreground *:w-full *:p-4 *:pl-8 hover:*:cursor-pointer">
                    {links.map(({ href, label }) => (
                        <Link key={href} href={href} className={pathName === href ? "border-b-2 border-solid border-primary text-primary font-bold" : "border-b border-solid"}>
                            {label}
                        </Link>
                    ))}
                </ul>
            </section>
        </>
    )
}