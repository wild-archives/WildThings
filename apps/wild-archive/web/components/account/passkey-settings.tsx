'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyRound, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Passkey {
  id: string;
  name: string;
  createdAt: string;
  lastUsed: string;
}

export function PasskeySettings() {
  const [passkeys, setPasskeys] = useState<Passkey[]>([
    {
      id: '1',
      name: 'MacBook Pro Touch ID',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20',
    },
  ]);

  const handleAddPasskey = async () => {
    // TODO: Implement WebAuthn registration logic
    console.log('Adding new passkey...');
  };

  const handleRemovePasskey = async (id: string) => {
    // TODO: Implement passkey removal logic
    console.log('Removing passkey:', id);
    setPasskeys(passkeys.filter(key => key.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">通行密钥设置</h3>
        <p className="text-sm text-muted-foreground">
          管理您的通行密钥以实现无密码登录。
        </p>
      </div>

      <Alert>
        <KeyRound className="h-4 w-4" />
        <AlertTitle>关于通行密钥</AlertTitle>
        <AlertDescription>
          通行密钥是密码的安全替代方案。它使用生物识别数据或设备PIN码进行身份验证，无需记住复杂的密码。
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <Button onClick={handleAddPasskey}>
          添加新通行密钥
        </Button>

        {passkeys.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>最后使用</TableHead>
                <TableHead className="w-[100px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passkeys.map((passkey) => (
                <TableRow key={passkey.id}>
                  <TableCell>{passkey.name}</TableCell>
                  <TableCell>{passkey.createdAt}</TableCell>
                  <TableCell>{passkey.lastUsed}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemovePasskey(passkey.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-sm text-muted-foreground">
            暂无通行密钥。
          </div>
        )}
      </div>
    </div>
  );
}