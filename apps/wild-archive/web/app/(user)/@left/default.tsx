'use client';
import Menu from '@/components/route/Menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ac, Session } from '@/lib/auth-client';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Default() {
  const sessionInfo = ac.useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Menu />
      </div>
      <section
        id="user"
        className="w-full flex justify-between items-center pr-4 border-t border-solid"
        onClick={() => !sessionInfo.data && router.push('/auth')}
      >
        {/* <Link href={sessionInfo.data ? '/profile' : '/auth'}> */}
        <div className="inline-flex items-center gap-4 justify-start p-4 w-full cursor-pointer">
          <Avatar>
            <AvatarFallback>
              {sessionInfo?.data?.user?.name?.substring(0, 2) ?? '?'}
            </AvatarFallback>
          </Avatar>
          <span>{sessionInfo?.data?.user?.name ?? '未登录'}</span>
        </div>
        <div className={sessionInfo.data?.user.id ? 'block' : 'hidden'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent hover:bg-primary-foreground ">
                <MenuIcon className="text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>更多</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => ac.signOut()}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* </Link> */}
      </section>
    </div>
  );
}
