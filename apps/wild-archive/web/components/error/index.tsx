import { Bird } from "lucide-react";

export default function ErrorSection({ error }: { error: string | null }) {
  return (
    <div className="w-full flex flex-col items-center">
      <Bird className="w-10 h-10 text-red-500" />
      <div className="text-lg font-bold mt-4">咕咕咕，页面不见了</div>
      <div className="block">{error || '未知错误，请联系管理员'}</div>
    </div>
  );
}
