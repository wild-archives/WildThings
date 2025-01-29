'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export function TwoFactorAuth() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // This would be provided by your backend
  const mockSecretKey = 'JBSWY3DPEHPK3PXP';
  const mockQrCodeUrl = `otpauth://totp/WildArchive:user@example.com?secret=${mockSecretKey}&issuer=WildArchive`;

  const handleEnable2FA = () => {
    setIsSetupMode(true);
  };

  const handleVerifyAndEnable = () => {
    // TODO: Implement verification logic
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      setIsSetupMode(false);
    }
  };

  const handleDisable2FA = () => {
    // TODO: Implement disable logic
    setIsEnabled(false);
  };

  if (isSetupMode) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">设置两步验证</h3>
          <p className="text-sm text-muted-foreground">
            使用您的身份验证器应用扫描二维码并输入验证码。
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG value={mockQrCodeUrl} size={200} />
          </div>

          <div className="w-full max-w-sm space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>手动设置</AlertTitle>
              <AlertDescription>
                如果无法扫描二维码，请手动输入此密钥：{mockSecretKey}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="code">验证码</Label>
              <Input
                id="code"
                placeholder="输入6位数字验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleVerifyAndEnable}
                disabled={verificationCode.length !== 6}
              >
                验证并启用
              </Button>
              <Button variant="outline" onClick={() => setIsSetupMode(false)}>
                取消
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">两步验证</h3>
        <p className="text-sm text-muted-foreground">
          使用基于TOTP的身份验证为您的账户添加额外的安全措施。
        </p>
      </div>

      <Alert variant={isEnabled ? 'default' : 'destructive'}>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>
          {isEnabled ? '两步验证已启用' : '两步验证未启用'}
        </AlertTitle>
        <AlertDescription>
          {isEnabled
            ? '您的账户已受两步验证保护。'
            : '启用两步验证以增加账户安全性。'}
        </AlertDescription>
      </Alert>

      <Button
        onClick={isEnabled ? handleDisable2FA : handleEnable2FA}
        variant={isEnabled ? 'destructive' : 'default'}
      >
        {isEnabled ? '禁用两步验证' : '启用两步验证'}
      </Button>
    </div>
  );
}
