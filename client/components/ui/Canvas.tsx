"use client";
import { cn } from "@/lib/utils";
import CanvasDraw from "react-canvas-draw";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Undo, Redo, Trash2 } from 'lucide-react';
import { link } from "fs";

interface CanvasProps {
    setData: (data: string) => void;
    width?: number;
    height?: number;
    className?: string;
}

export default function Canvas({ setData, width, height, className }: CanvasProps) {
    const canvasRef = useRef<CanvasDraw | null>(null);
    const [history, setHistory] = useState<string[]>([]);



    const handlerHistory = () => {
        const canvasDraw = canvasRef.current;
        if (!canvasDraw) {
            console.error("Canvas reference not found");
            return;
        }

        const historyData = canvasDraw.getSaveData();
        setHistory((prev) => [...prev, historyData]);
    }

    useEffect(() => {

        const canvasDraw = canvasRef.current;
        if (!canvasDraw) {
            console.error("Canvas reference not found");
            return;
        }


        saveImageData();
    }, [history]);


    const clearAll = () => {
        const canvasDraw = canvasRef.current;
        if (!canvasDraw) {
            console.error("Canvas reference not found");
            return;
        }

        canvasDraw.clear();
        setHistory([]);
        setData("");
    }

    const undo = () => {
        const canvasDraw = canvasRef.current;
        if (!canvasDraw) {
            console.error("Canvas reference not found");
            return;
        }

        canvasDraw.undo();
    }

    const saveImageData = () => {
        const canvasDraw = canvasRef.current;
        if (!canvasDraw) {
            console.error("Canvas reference not found");
            return;
        }

        // @ts-ignore: canvasRef.current.canvas is not typed, but "drawing" is the default canvas key
        const canvasElement = canvasDraw.canvas["drawing"] || canvasDraw.canvas;

        if (!canvasElement || !(canvasElement instanceof HTMLCanvasElement)) {
            console.error("Could not access the canvas element");
            return;
        }

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 500;
        tempCanvas.height = 500;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, 500, 500);
        tempCtx.drawImage(canvasElement, 0, 0, 500, 500);

        const dataURL = tempCanvas.toDataURL("image/jpeg");

        if (!dataURL) {
            console.error("Could not save the image");
            return;
        }

        setData(dataURL);

    };

    return (
        <div className={cn("flex flex-col gap-5", { className })}>
            <div className="flex justify-center items-center gap-5 mt-5">
                <Button className="flex gap-2 items-center"
                    onClick={clearAll}
                >
                    <Trash2 />
                    <span>ClearAll</span>
                </Button>
                <Button className="flex gap-2 items-center"
                    onClick={undo}
                >
                    <Undo />
                    <span>Undo</span>
                </Button>
            </div>
            <CanvasDraw
                canvasWidth={700}
                canvasHeight={500}
                brushRadius={5}
                ref={canvasRef}
                hideGrid={true}
                onChange={handlerHistory}
                brushColor="#000"
                className="border rounded-lg border-[#464646]"
            />
        </div>
    );
}