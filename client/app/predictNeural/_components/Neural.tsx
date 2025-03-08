"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { predictCNNModel } from "@/actions/Action";
import Loader from "@/components/ui/Loader";

export default function Neural() {
    const [Img, SetImg] = useState<string | null>(null);
    const ImgRef = useRef<HTMLInputElement>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const selectImage = () => {
        ImgRef.current?.click();
        setAnswer(null);
        SetImg(null);
    };

    function resizeImage(file: File, maxWidth: number, maxHeight: number, callback: (resizedBase64: string) => void) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            const img = new window.Image();
            if (event.target) {
                img.src = (event.target as FileReader).result as string;
            }

            img.onload = function () {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // คำนวณอัตราส่วนให้ไม่เสียสัดส่วนภาพ
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // กำหนดขนาดใหม่ให้ canvas
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // แปลงเป็น Base64
                const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // ลด quality เป็น 70%
                callback(resizedBase64);
            };
        };
    }


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        resizeImage(file, 800, 800, function(resizedBase64) {
            SetImg(String(resizedBase64));
        });
    };

    const predict = async () => {
        if (!Img) {
            return;
        }

        setLoading(true);

        new Promise((resolve) => {
            setTimeout(() => {
                resolve(predictCNNModel(Img));
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
        <div className="w-full h-full">
            {loading && <Loader />}
            <header className={`flex justify-center items-center w-full mt-10`}>
                <span className="text-2xl font-bold">Neural Network Models</span>
            </header>
            <div className="w-full flex flex-col gap-5 justify-center items-center mt-5">
                <span className="text-4xl font-bold text-primary">{answer}</span>

                <div
                    className="w-[300px] h-[300px] sm:w-[700px] sm:h-[500px] border-2 border-dashed rounded-lg border-[#464646] p-5 uploadImg flex justify-center items-center cursor-pointer"
                    onClick={selectImage}
                >
                    {Img ? (
                        <Image
                            src={Img}
                            alt="preview"
                            width={300}
                            height={300}
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
                ฺ <Button className="text-lg" size="lg"
                    onClick={predict}
                >Predict</Button>
            </div>
        </div>
    );
}
