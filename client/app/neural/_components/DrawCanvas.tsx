"use client"
import {useState,useEffect} from 'react';
import Canvas from '@/components/ui/Canvas'
import {sendImageToNeuralNetWorkModel} from '@/actions/Action'
import { Button } from '@/components/ui/button';

export default function DrawCanvas() {
    const [Data, setData] = useState<string | null>(null);

    const sendModelToAPI = async () => {
      if (!Data) {
        return;
      }

      const response = await sendImageToNeuralNetWorkModel(Data);
      console.log(response);

    }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Canvas setData={setData} width={224} height={224} className='w-full h-full'/>
      <Button onClick={sendModelToAPI} className='mt-4'>Send</Button>
    </div>
  )
}
