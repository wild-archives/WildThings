'use client';
import SignIn from '@/components/signin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from '../background.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignUp } from '@/components/signup';
import { useRouter } from 'next/navigation';
import { ResetStart } from '@/components/reset';

export default function ResetPage() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen relative">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>重置密码</CardTitle>
          <CardDescription>使用你的帐号邮箱重设密码</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <ResetStart />
        </CardContent>
      </Card>
      <div className={styles.background} />
    </div>
  );
}
