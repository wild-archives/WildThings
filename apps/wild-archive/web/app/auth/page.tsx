'use client';
import SignIn from '@/components/signin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from './background.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignUp } from '@/components/signup';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen relative">
      <Tabs defaultValue="sign-in" className="w-full max-w-md">
        <TabsList className="py-9">
          <TabsTrigger value="sign-in" className="text-lg p-5">
            登录
          </TabsTrigger>
          <TabsTrigger value="sign-up" className="text-lg p-5">
            注册
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card className="w-full pt-6">
            <CardContent>
              <SignIn successCb={() => router.back()} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card className="w-full pt-6">
            <CardContent>
              <SignUp successCb={() => router.back()} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className={styles.background} />
    </div>
  );
}
