'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  type IconType,
  SiDiscord,
  SiGithub,
  SiGoogle,
  SiX,
} from '@icons-pack/react-simple-icons';

interface SocialProvider {
  id: string;
  name: string;
  icon: IconType;
  connected: boolean;
}

export function SocialConnections() {
  const socialProviders: SocialProvider[] = [
    {
      id: 'github',
      name: 'GitHub',
      icon: SiGithub,
      connected: false,
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: SiDiscord,
      connected: false,
    },
    {
      id: 'google',
      name: 'Google',
      icon: SiGoogle,
      connected: false,
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      icon: SiX,
      connected: false,
    },
  ];

  const handleConnection = (providerId: string, isConnected: boolean) => {
    // TODO: Implement social connection logic
    console.log(`${providerId} ${isConnected ? 'disconnected' : 'connected'}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">社交账号关联</h3>
        <p className="text-sm text-muted-foreground">
          关联你的社交账号以便快速登录
        </p>
      </div>
      <div className="space-y-4">
        {socialProviders.map((provider) => (
          <div
            key={provider.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <provider.icon className="w-6 h-6" />
              <div>
                <p className="font-medium">{provider.name}</p>
                <p className="text-sm text-muted-foreground">
                  {provider.connected ? '已关联' : '未关联'}
                </p>
              </div>
            </div>
            <Button
              variant={provider.connected ? 'destructive' : 'outline'}
              onClick={() => handleConnection(provider.id, provider.connected)}
            >
              {provider.connected ? '解除关联' : '关联'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
