import React from 'react'
import Canvas from '@/components/ui/Canvas'

export default function page() {
  return (
    <div className='w-full h-full'>
      <header className='w-full mt-10 flex justify-center items-center'>
        <span className='text-2xl font-semibold'>Neural Network Models</span>
      </header>
      <div className='flex justify-center items-center rounded-lg overflow-hidden p-2'>
        <Canvas width={1200} height={700} className='w-full h-full'/>
      </div>
      
    </div>
  )
}
