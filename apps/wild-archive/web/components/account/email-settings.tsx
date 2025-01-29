'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { valibotResolver } from '@hookform/resolvers/valibot';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

const emailFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, '请输入邮箱'),
    v.email('邮箱格式不正确'),
  ),
});

export function EmailSettings() {
  const form = useForm<v.InferInput<typeof emailFormSchema>>({    
    resolver: valibotResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: v.InferInput<typeof emailFormSchema>) {
    // TODO: Add email update logic
    console.log(values);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">邮箱设置</h3>
        <p className="text-sm text-muted-foreground">
          更新您的邮箱地址并管理邮箱相关设置。
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="输入新的邮箱地址" {...field} />
                </FormControl>
                <FormDescription>
                  此邮箱将用于账户恢复和接收通知。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">更新邮箱</Button>
        </form>
      </Form>
    </div>
  );
}
