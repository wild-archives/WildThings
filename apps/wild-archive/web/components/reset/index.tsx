'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ac } from '@/lib/auth-client';
import { toast } from 'sonner';

export function ResetStart({
  successCb,
}: { successCb?: (success: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentHostURL, setCurrentHostURL] = useState('');
  useEffect(() => {
    setCurrentHostURL(window.location.origin);
  }, []);

  return (
    <div className="grid gap-4">
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
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const res = await ac.forgetPassword({
            email,
            redirectTo: `${currentHostURL}/auth/reset/password`,
          });
          if (res.error) {
            console.error(res.error);
            toast.error(res.error.message);
          } else {
            toast.success('发送成功');
            successCb?.(true);
          }
          setLoading(false);
        }}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          '发送重置邮件'
        )}
      </Button>
    </div>
  );
}

export function ResetPasswordForm({
  token,
  successCb,
}: { token: string; successCb?: (success: boolean) => void }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          placeholder="密码"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">再次输入密码</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="再次输入密码"
          autoComplete="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        onClick={async () => {
          if (password !== confirmPassword) {
            toast.error('两次输入的密码不一致');
            return;
          }
          setLoading(true);
          const res = await ac.resetPassword({
            newPassword: password,
            token,
          });
          if (res.error) {
            toast.error(res.error.message);
          } else {
            toast.success('密码重置成功');
            successCb?.(true);
          }
          setLoading(false);
        }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : '重置密码'}
      </Button>
    </div>
  );
}
