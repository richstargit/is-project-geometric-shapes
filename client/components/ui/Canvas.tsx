"use client";
import { cn } from "@/lib/utils";
import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";

interface CanvasProps {
    data?: string;
    setData?: (color: string) => void;
    width?: number;
    height?: number;
    className?: string;
}


export default function Canvas({ width, height, className }: CanvasProps) {
    const canvasRef = useRef<CanvasDraw | null>(null);

    return (
        <div className={cn("flex flex-col", { className })}>
            <CanvasDraw canvasWidth={width} canvasHeight={height} brushRadius={3}
                ref={canvasRef}
                hideGrid={true}
                onChange={(canvas) => {
                    const data = canvas.getSaveData();
                    console.table(data);
                }}
            />
            <button
                onClick={() => {
                    canvasRef.current?.clear();
                }}
            >
                CLEAR
            </button>
        </div>
    )
}
