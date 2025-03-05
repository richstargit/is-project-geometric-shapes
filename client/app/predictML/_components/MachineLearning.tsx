"use client"
import {useState} from 'react';
import Canvas from '@/components/ui/Canvas'
import {predictMLModel} from '@/actions/Action'
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';

export default function MachineLearning() {
    const [Data, setData] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

   const predict = async () => {
           if (!Data) {
               return;
           }
   
           setLoading(true);
           
           new Promise((resolve) => {
               setTimeout(() => {
                   resolve(predictMLModel(Data));
               }, 1000);
           }).then((res: unknown) => {
   
               const { result } = res as { result: string };
   
               if (result) {
                   setAnswer(result as string);
               }
   
               setLoading(false);
           })

      }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {loading && <Loader/>}
       <span className="text-4xl font-bold text-primary">{answer}</span>
      <Canvas setData={setData} width={500} height={500} className='w-full h-full'/>
      <Button onClick={predict} className='mt-5 text-lg' size='lg'>Predict</Button>
    </div>
  )
}
