'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Grid, Camera, Link as LinkIcon, MapPin, Calendar } from 'lucide-react';
import { SiBilibili, SiX } from '@icons-pack/react-simple-icons';

const Space = () => {
  const userProfile = {
    name: 'Maxtune Lee',
    avatar: '/demo.png',
    banner: '/demo2.jpg', // Default banner image
    bio: 'Hello, 有事情吗?',
    followers: 49,
    following: 683,
    posts: 163,
    location: '位于 广东省广州市',
    joinDate: '02-09-17',
    workplace: '就职于 WildBox',
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/maxtunelee', icon: SiX },
      {
        platform: 'Bilibili',
        url: 'https://space.bilibili.com/maxtunelee',
        icon: SiBilibili,
      },
    ],
  };

  return (
    <div className="container mx-auto">
      {/* Banner Section */}
      <div className="relative w-full h-56 bg-gray-100">
        <Image
          src={userProfile.banner}
          alt="Profile Banner"
          fill
          className="object-cover"
        />
        {/* Avatar overlapping banner */}
        <div className="absolute -bottom-8 left-6 w-32 h-32">
          <Image
            src={userProfile.avatar}
            alt={userProfile.name}
            fill
            className="object-cover border-4 border-white"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        >
          更换封面
        </Button>
      </div>

      {/* Profile Content */}
      <div className="px-6 mt-6 pb-10">
        <div className="flex flex-col md:flex-row gap-8 items-start md:pl-40">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <Button variant="outline" size="sm">
                编辑资料
              </Button>
            </div>

            <div className="flex gap-6 mb-4">
              <span>
                <strong>{userProfile.posts}</strong> 个 Archive
              </span>
              <span>
                <strong>{userProfile.followers}</strong> 已关注
              </span>
              <span>
                <strong>{userProfile.following}</strong> 粉丝
              </span>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>{userProfile.bio}</p>
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {userProfile.location}
              </p>
              <p className="flex items-center gap-2">
                <LinkIcon size={16} />
                {userProfile.workplace}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} />
                {userProfile.joinDate}
              </p>
              <div className="flex gap-4 mt-4">
                {userProfile.socialLinks.map((link, index) => (
                  <a
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <link.icon size={16} />
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Archive Section */}
        <div className="mt-12">
          <div className="flex items-center gap-2 border-b pb-4 mb-6">
            <Grid size={20} />
            <h2 className="text-lg font-semibold">Archives</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Archive Grid Items - Placeholder */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;
