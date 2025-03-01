"use client";
import { cn } from "@/lib/utils";
import CanvasDraw from "react-canvas-draw";
import { useRef,useState , useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Eraser,Undo , Redo , Trash2} from 'lucide-react';

interface CanvasProps {
    setData: (data: string) => void;
    width?: number;
    height?: number;
    className?: string;
}

export default function Canvas({ setData, width, height, className }: CanvasProps) {
    const canvasRef = useRef<CanvasDraw | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [color, setColor] = useState("#000000");
    const [brushRadius, setBrushRadius] = useState(2);



    const handlerHistory = () => {
        const canvasDraw = canvasRef.current;
        if (!canvasDraw) {
            console.error("Canvas reference not found");
            return;
        }

        const historyData = canvasDraw.getSaveData();
        setHistory((prev) => [...prev, historyData]);
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
                <Button className="flex gap-2 items-center">
                    <Trash2/>
                    <span>ClearAll</span>
                </Button>
                <Button className="flex gap-2 items-center">
                    <Undo/>
                    <span>Undo</span>
                </Button>
                <Button className="flex gap-2 items-center">
                    <Redo/>
                    <span>Redo</span>
                </Button>
                <Button className="flex gap-2 items-center">
                    <Eraser/>
                    <span>Eraser</span>
                </Button>
            </div>
            <CanvasDraw
                canvasWidth={700}
                canvasHeight={500}
                brushRadius={brushRadius}
                ref={canvasRef}
                hideGrid={true}
                onChange={handlerHistory}
                brushColor={color}
                className="border rounded-lg border-[#464646]"
            />
        </div>
    );
}