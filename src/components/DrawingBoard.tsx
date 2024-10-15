import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Square, Circle, Triangle, Pencil, PaintBucket } from 'lucide-react';

export const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('pencil');
  const [lineWidth, setLineWidth] = useState(5);
  const [shape, setShape] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
  }, [color, lineWidth]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (shape) {
      drawShape(context, x, y);
    } else {
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e) => {
    if (!isDrawing || shape) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setShape('');
  };

  const drawShape = (context, x, y) => {
    context.beginPath();
    switch (shape) {
      case 'square':
        context.rect(x - 25, y - 25, 50, 50);
        break;
      case 'circle':
        context.arc(x, y, 25, 0, 2 * Math.PI);
        break;
      case 'triangle':
        context.moveTo(x, y - 25);
        context.lineTo(x + 25, y + 25);
        context.lineTo(x - 25, y + 25);
        context.closePath();
        break;
    }
    context.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const savePNG = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Drawing Board</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10"
        />
        <Select onValueChange={(value) => setTool(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select tool" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pencil"><Pencil className="mr-2" />Pencil</SelectItem>
            <SelectItem value="brush"><PaintBucket className="mr-2" />Brush</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setShape(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select shape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=""><Pencil className="mr-2" />Free draw</SelectItem>
            <SelectItem value="square"><Square className="mr-2" />Square</SelectItem>
            <SelectItem value="circle"><Circle className="mr-2" />Circle</SelectItem>
            <SelectItem value="triangle"><Triangle className="mr-2" />Triangle</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <span>Line Width:</span>
          <Slider
            value={[lineWidth]}
            onValueChange={(value) => setLineWidth(value[0])}
            max={20}
            step={1}
            className="w-[100px]"
          />
        </div>
        <Button onClick={clearCanvas}>Clear</Button>
        <Button onClick={savePNG}>Save PNG</Button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="border border-gray-300"
      />
    </div>
  );
};