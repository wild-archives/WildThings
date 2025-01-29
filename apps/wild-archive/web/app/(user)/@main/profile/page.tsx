'use client';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import * as v from 'valibot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const profileSchema = v.object({
  nickname: v.pipe(
    v.string(),
    v.minLength(2, '昵称至少 2 个字符'),
    v.maxLength(30, '昵称最长 30 个字符'),
  ),
  gender: v.picklist(
    ['male', 'female', 'private'],
    '请选择你的性别',
  ),
  bio: v.pipe(
    v.string(),
    v.maxLength(500, '简介最长 500 个字符'),
  ),
});

type ProfileFormValues = v.InferInput<typeof profileSchema>;

const Profile = () => {
  const form = useForm<ProfileFormValues>({
    resolver: valibotResolver(profileSchema),
    defaultValues: {
      nickname: '',
      gender: undefined,
      bio: '',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
    // TODO: Implement API call to update profile
  };

  return (
    <div className=" container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">更新个人资料</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>昵称</FormLabel>
                <FormControl>
                  <Input placeholder="输入你的昵称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择你的性别" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">男</SelectItem>
                    <SelectItem value="female">女</SelectItem>
                    <SelectItem value="private">不公开</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="介绍一下你自己吧"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">保存更改</Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
