"use client";
import { cn } from "@/lib/utils";
import CanvasDraw from "react-canvas-draw";
import { useRef,useState } from "react";

interface CanvasProps {
    setData: (data: string) => void;
    width?: number;
    height?: number;
    className?: string;
}

export default function Canvas({ setData, width, height, className }: CanvasProps) {
    const canvasRef = useRef<CanvasDraw | null>(null);
    const [color, setColor] = useState("#000000");
    const [brushRadius, setBrushRadius] = useState(3);


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
        tempCanvas.width = 224;
        tempCanvas.height = 224;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, 224, 224);
        tempCtx.drawImage(canvasElement, 0, 0, 224, 224);

        const dataURL = tempCanvas.toDataURL("image/jpeg");

        if (!dataURL) {
            console.error("Could not save the image");
            return;
        }

        setData(dataURL);

        // const link = document.createElement("a");
        // link.href = dataURL;
        // link.download = "drawing.jpg";
        // link.click();

    };

    return (
        <div className={cn("flex flex-col", { className })}>
            <CanvasDraw
                canvasWidth={width}
                canvasHeight={height}
                brushRadius={brushRadius}
                ref={canvasRef}
                hideGrid={true}
                onChange={saveImageData}
                brushColor={color}
                className="border rounded-lg"
            />
        </div>
    );
}