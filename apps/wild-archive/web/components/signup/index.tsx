'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ac } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function SignUp({
  successCb,
}: {
  successCb?: (success: boolean) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">名称</Label>
        <Input
          id="name"
          placeholder="输入你的帐号名称"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="请输入密码"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">确认密码</Label>
        <Input
          id="password_confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="new-password"
          placeholder="请再次输入密码"
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-5"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const res = await ac.signUp.email({
            email,
            password,
            name,
          });
          if (res.error) {
            toast.error(res.error.message || '发生了一些错误，请重试');
          } else {
            toast.success('注册成功');
            successCb?.(true);
          }
          setLoading(false);
        }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : '创建账号'}
      </Button>
    </div>
  );
}
