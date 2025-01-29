'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { EmailSettings } from '@/components/account/email-settings';
import { PasswordSettings } from '@/components/account/password-settings';
import { SocialConnections } from '@/components/account/social-connections';
import { TwoFactorAuth } from '@/components/account/two-factor-auth';
import { PasskeySettings } from '@/components/account/passkey-settings';

export default function AccountPage() {
  return (
    <div className=" container mx-auto p-6 space-y-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">账户</h2>
        <p className="text-muted-foreground">管理您的账户设置和安全选项。</p>
      </div>
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">邮箱</TabsTrigger>
          <TabsTrigger value="password">密码</TabsTrigger>
          <TabsTrigger value="social">社交账号</TabsTrigger>
          <TabsTrigger value="2fa">两步验证</TabsTrigger>
          <TabsTrigger value="passkey">通行密钥</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <Card>
            <CardContent className="pt-6">
              <EmailSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardContent className="pt-6">
              <PasswordSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="social">
          <Card>
            <CardContent className="pt-6">
              <SocialConnections />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="2fa">
          <Card>
            <CardContent className="pt-6">
              <TwoFactorAuth />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="passkey">
          <Card>
            <CardContent className="pt-6">
              <PasskeySettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
