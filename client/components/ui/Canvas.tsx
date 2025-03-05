"use client";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Undo, Trash2 } from 'lucide-react';

interface CanvasProps {
    setData: (data: string) => void;
    width?: number;
    height?: number;
    className?: string;
}

export default function Canvas({ setData, width = 500, height = 500, className }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const saveState = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        setHistory((prev) => [...prev, canvas.toDataURL()]);
      };
    
    const undo = () => {
        if (history.length === 0) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const lastState = history[history.length - 1];
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setHistory(history.slice(0, -1));
            saveImageData();
        };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
        saveState();
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
        saveImageData();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        saveState();
    };


    const clearCanvas = () => {
        saveState();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setData("");
    };

    const saveImageData = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 224;
        tempCanvas.height = 224;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, 224, 224);
        tempCtx.drawImage(canvas, 0, 0, 224, 224);

        const imageData = tempCanvas.toDataURL("image/jpeg");
        setData(imageData);  
    };

    return (
        <div className={cn("flex flex-col gap-5", className)}>
            <div className="flex justify-center items-center gap-5 mt-5">
                <Button className="flex gap-2 items-center" onClick={clearCanvas}>
                    <Trash2 />
                    <span>Clear All</span>
                </Button>
                <Button className="flex gap-2 items-center"
                    onClick={undo}
                >
                    <Undo />
                    <span>Undo</span>
                </Button>
            </div>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border rounded-lg border-[#464646] "
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
}
