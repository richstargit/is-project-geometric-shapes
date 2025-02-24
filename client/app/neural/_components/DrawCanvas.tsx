"use client"
import {useState,useEffect} from 'react';
import Canvas from '@/components/ui/Canvas'


export default function DrawCanvas() {
    const [Data, setData] = useState<string | null>(null);

    useEffect(() => {
        if (Data) {
            console.log(Data);
        }
    }, [Data]);
    
  return (
    <Canvas setData={setData} width={1200} height={700} className='w-full h-full'/>
  )
}
