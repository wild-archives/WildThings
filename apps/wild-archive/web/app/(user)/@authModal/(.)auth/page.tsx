"use client";
import SignIn from "@/components/signin";
import { SignUp } from "@/components/signup";
import { DialogHeader, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function LoginModal() {
    const router = useRouter();
    return (
        <Dialog defaultOpen={true} onOpenChange={() => router.back()}>
            <DialogHeader hidden>
                <DialogTitle>登录</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <Tabs defaultValue="sign-in" className="w-full">
                    <TabsList className="py-9 mb-6">
                        <TabsTrigger value="sign-in" className="text-lg p-5">登录</TabsTrigger>
                        <TabsTrigger value="sign-up" className="text-lg p-5">注册</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-in">
                        <SignIn successCb={() => router.back()} />
                    </TabsContent>
                    <TabsContent value="sign-up">
                        <SignUp successCb={() => router.back()} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}