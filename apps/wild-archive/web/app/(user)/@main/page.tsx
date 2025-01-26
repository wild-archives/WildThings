import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const MyArchives = () => {
  return (
    <div className="container mx-auto p-6 space-y-4">
      <section className="flex justify-between">
        <h1 className="text-2xl font-semibold">我的 Archives</h1>
        <Button>
          <Plus /> 创建
        </Button>
      </section>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(50)].map((_, index) => {
          return (
            <Card
              key={`archive-card-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className="relative group"
            >
              <CardContent className="w-full relative h-[300px] overflow-hidden cursor-pointer">
                <Image
                  src="/demo.png"
                  alt="archive cover"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  fill
                />
              </CardContent>
              <CardHeader className="absolute bg-gradient-to-t from-gray-900/80 from-50% to-transparent bottom-0 w-full group-hover:from-red-900/80">
                <CardTitle className="text-white">Maxtune</CardTitle>
                <CardDescription className="text-white opacity-50 line-clamp-2 text-ellipsis overflow-hidden">
                  这是一个测试的 Archives, test, test,test,test, test, 超出两行
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default MyArchives;
