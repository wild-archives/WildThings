'use client';
import SignIn from '@/components/signin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from '../../background.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignUp } from '@/components/signup';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResetPasswordForm } from '@/components/reset';
import { Bird } from 'lucide-react';
import ErrorSection from '@/components/error';

export default function ResetPasswordPage() {
  const router = useRouter();
  const seachParams = useSearchParams();
  const error = seachParams.get('error');
  const token = seachParams.get('token');
  return (
    <div className="flex justify-center items-center h-screen relative">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>重置密码</CardTitle>
          <CardDescription>使用你的帐号邮箱重设密码</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          {token === null || error ? (
            <ErrorSection error={error} />
          ) : (
            <ResetPasswordForm token={token as string} />
          )}
        </CardContent>
      </Card>
      <div className={styles.background} />
    </div>
  );
}
