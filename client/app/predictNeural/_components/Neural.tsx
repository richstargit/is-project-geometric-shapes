"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { predictNeuralNetWorkModel } from "@/actions/Action";

export default function Neural() {
    const [Img, SetImg] = useState<string | null>(null);
    const ImgRef = useRef<HTMLInputElement>(null);

    const selectImage = () => {
        ImgRef.current?.click();
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                SetImg(reader.result as string);
            }
        };
    };

    const predict = async () => {
        if (!Img) {
            return;
        }

        const response = await predictNeuralNetWorkModel(Img);
        console.log(response);
    }

    return (
        <div className="w-full h-full">
            <header className="flex justify-center items-center w-full mt-10">
                <span className="text-2xl font-bold">Neural Network Models</span>
            </header>
            <div className="w-full flex flex-col gap-5 justify-center items-center mt-10">
                <span className="text-xl">Preview</span>

                <div
                    className="w-[700px] h-[500px] border-2 border-dashed rounded-lg border-[#464646] p-5 uploadImg flex justify-center items-center cursor-pointer"
                    onClick={selectImage}
                >
                    {Img ? (
                        <Image
                            src={Img}
                            alt="preview"
                            width={700}
                            height={500}
                            className="w-full h-full object-contain"
                            unoptimized
                        />
                    ) : (
                        <span className="text-gray-500">Click to upload an image</span>
                    )}
                </div>

                <input type="file" accept="image/*" hidden ref={ImgRef} onChange={handleImage} />
            </div>

            <div className="w-full flex justify-center items-center mt-10">
                ฺ <Button
                    onClick={predict}
                >Predict</Button>
            </div>
        </div>
    );
}
