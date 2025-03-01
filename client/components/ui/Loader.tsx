import Image from 'next/image'
import { cn } from '@/lib/utils';

const Loader = ({className} : {className? : string}) => {
   return (
      <main className={cn("w-full relative", { className })}>
         <Image src="/loading.svg" alt="loading" width={50} height={50} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent" />
      </main>
   );
}

export default Loader;