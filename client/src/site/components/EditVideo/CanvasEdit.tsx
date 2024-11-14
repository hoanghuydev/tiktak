import React, { Ref, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { videoConfigSelector } from '@/redux/selector';
import { useSelector } from 'react-redux';
import { TextConfig } from '@/models/videoEdit';
const CanvasEdit = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const videoConfig = useSelector(videoConfigSelector);
  useEffect(() => {
    const handleVideoLoaded = () => {
      if (canvasRef.current && videoRef.current) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        const initCanvas = new fabric.Canvas(canvasRef.current, {
          width: videoWidth,
          height: videoHeight,
          selection: true,
        });

        initCanvas.backgroundColor = '#ffffff00';
        initCanvas.renderAll();
        setCanvas(initCanvas);
      }
    };

    videoRef.current?.addEventListener('loadedmetadata', handleVideoLoaded);
    return () => {
      videoRef.current?.removeEventListener(
        'loadedmetadata',
        handleVideoLoaded
      );
    };
  }, [videoRef.current, canvasRef.current]);
  useEffect(() => {
    if (canvas) {
      videoConfig.text.forEach((textConfig: TextConfig) => {
        const {
          content,
          position,
          fontFamily,
          fontSize = 24,
          color = 'white',
          fontStyle = 'normal',
          opacity = 1,
        } = textConfig;
        const fabricText = new fabric.Textbox(content, {
          left:
            typeof position.x === 'number' ? position.x : parseInt(position.x),
          top:
            typeof position.y === 'number' ? position.y : parseInt(position.y),
          fontFamily,
          fontSize,
          fill: color,
          styles: fontStyle,
          opacity,
          selectable: true,
        });
        canvas.add(fabricText);
        canvas.setActiveObject(fabricText);
      });

      canvas.renderAll();
    }
  }, [videoConfig.text]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasEdit;
