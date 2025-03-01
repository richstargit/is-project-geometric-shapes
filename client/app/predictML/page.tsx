import React from 'react'
import MachineLearning from './_components/MachineLearning'

export default function page() {
  return (
    <div className='w-full h-full'>
      <header className='w-full mt-10 flex justify-center items-center'>
        <span className='text-2xl font-semibold'>Machine Learning</span>
      </header>
      <div className='flex justify-center items-center rounded-lg overflow-hidden p-2'>
        <MachineLearning/>
      </div>
      
    </div>
  )
}
