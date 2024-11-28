import SignIn from "@/components/signin";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export default function LoginModal() {
    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>登录</DialogTitle>
                </DialogHeader>
                <SignIn />
            </DialogContent>
        </Dialog>
    );
}