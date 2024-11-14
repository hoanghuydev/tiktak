import { Button } from 'antd';
import { fabric } from 'fabric';
import React, { useEffect, useRef, useState } from 'react';

const Fabric = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        selection: true,
        allowTouchScrolling: true,
      });
      initCanvas.backgroundColor = '#fff';
      initCanvas.renderAll();
      setCanvas(initCanvas);
    }
  }, []);
  const handleAddRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: '#D84D42',
      });
      canvas.add(rect).renderAll.bind(canvas);
      canvas.setActiveObject(rect);
    }
  };
  return (
    <div className="flex h-full w-full justify-center bg-black items-center">
      <div>
        <Button onClick={handleAddRectangle}>Rectangle</Button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Fabric;
