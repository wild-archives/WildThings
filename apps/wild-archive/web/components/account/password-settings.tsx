'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const passwordFormSchema = v.pipe(
  v.object({
    currentPassword: v.pipe(v.string(), v.minLength(1, '请输入当前密码')),
    newPassword: v.pipe(
      v.string(),
      v.minLength(8, '密码长度至少为8个字符'),
      v.regex(/[A-Z]/, '密码必须包含至少一个大写字母'),
      v.regex(/[a-z]/, '密码必须包含至少一个小写字母'),
      v.regex(/[0-9]/, '密码必须包含至少一个数字'),
      v.regex(/[^A-Za-z0-9]/, '密码必须包含至少一个特殊字符'),
    ),
    confirmPassword: v.string(),
  }),
  v.rawCheck(({ dataset, addIssue }) => {
    if (dataset.typed) {
      if (dataset.value.newPassword !== dataset.value.confirmPassword) {
        addIssue({
          message: '两次输入的密码不一致',
        });
      }
      if (dataset.value.currentPassword === dataset.value.newPassword) {
        addIssue({
          message: '新密码不能与当前密码相同',
        });
      }
    }
  }),
);
// 添加密码校验辅助函数
const passwordChecks = {
  minLength: (password: string) => password.length >= 8,
  hasUppercase: (password: string) => /[A-Z]/.test(password),
  hasLowercase: (password: string) => /[a-z]/.test(password),
  hasNumber: (password: string) => /[0-9]/.test(password),
  hasSpecial: (password: string) => /[^A-Za-z0-9]/.test(password),
};

// 计算密码强度（0-100）
const calculatePasswordStrength = (password: string) => {
  const checks = Object.values(passwordChecks).map((check) => check(password));
  const passedChecks = checks.filter(Boolean).length;
  return (passedChecks / checks.length) * 100;
};

// 替换 newPassword FormField 的 render 部分
export function PasswordSettings() {
  const form = useForm<v.InferInput<typeof passwordFormSchema>>({
    resolver: valibotResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: v.InferInput<typeof passwordFormSchema>) {
    // TODO: Add password update logic
    console.log(values);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">密码设置</h3>
        <p className="text-sm text-muted-foreground">
          时常更新的密码来确保你的帐户安全。
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前密码</FormLabel>
                <FormControl>
                  <Input
                    placeholder="输入你当前的密码"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新的密码</FormLabel>
                <FormControl>
                  <Input
                    placeholder="输入新的密码"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <div className="space-y-2">
                  <Progress
                    value={calculatePasswordStrength(field.value)}
                    className="h-2 w-full"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      {passwordChecks.minLength(field.value) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span>至少8个字符</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {passwordChecks.hasUppercase(field.value) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span>包含大写字母</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {passwordChecks.hasLowercase(field.value) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span>包含小写字母</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {passwordChecks.hasNumber(field.value) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span>包含数字</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {passwordChecks.hasSpecial(field.value) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span>包含特殊字符</span>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <Input
                    placeholder="再次输入新的密码"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">更新密码</Button>
        </form>
      </Form>
    </div>
  );
}
