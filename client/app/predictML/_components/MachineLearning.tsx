"use client"
import { useState } from 'react';
import Canvas from '@/components/ui/Canvas'
import { predictKNNModel, predictLRModel } from '@/actions/Action'
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';

export default function MachineLearning() {
    const [Data, setData] = useState<string | null>(null);
    const [answerKNN, setAnswerKNN] = useState<string | null>(null);
    const [answerLR, setAnswerLR] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const predict = async () => {
        if (!Data) {
            return;
        }

        setLoading(true);

        new Promise((resolve) => {
            setTimeout(() => {
                resolve(predictKNNModel(Data));
            }, 1000);
        }).then((res: unknown) => {

            const { result } = res as { result: string };

            if (result) {
                setAnswerKNN(result as string);
            }

        });

        new Promise((resolve) => {
            setTimeout(() => {
                resolve(predictLRModel(Data));
            }, 1000);
        }).then((res: unknown) => {

            const { result } = res as { result: string };

            if (result) {
                setAnswerLR(result as string);
            }

            setLoading(false);
        });
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            {loading && <Loader />}
            <div className="flex justify-center w-full gap-5 mb-3 mt-5">

                <div className='flex border-2 flex-col p-2 rounded-xl justify-center items-center'>
                    <span>K-Nearest Neighbors</span>
                    {answerKNN ? <span className='text-xl text-primary text-center'>{answerKNN}</span>: <span>. . .</span>}
                </div>
                <div className='flex border-2 flex-col p-2 rounded-xl justify-center items-center'>
                    <span>Logistic Regression</span>
                    {answerLR ? <span className='text-xl text-primary text-center'>{answerLR}</span>: <span>. . .</span>}
                </div>

            </div>
            <Canvas setData={setData} width={500} height={500} />
            <Button onClick={predict} className='mt-5 text-lg mb-[5rem]' size='lg'>Predict</Button>
        </div>
    )
}
