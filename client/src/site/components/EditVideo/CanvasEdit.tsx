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
      // Remove only text objects
      canvas.getObjects().forEach((obj) => {
        if (obj.type === 'textbox' || obj.type === 'text') {
          canvas.remove(obj);
        }
      });

      // Add each text configuration to the canvas
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

        // Create a new Textbox with valid configurations
        const fabricText = new fabric.Textbox(content, {
          left:
            typeof position.x === 'number'
              ? position.x
              : parseInt(position.x, 10),
          top:
            typeof position.y === 'number'
              ? position.y
              : parseInt(position.y, 10),
          fontFamily,
          fontSize,
          fill: color,
          styles: fontStyle,
          opacity,
          selectable: true,
        });

        // Add the text to the canvas
        canvas.add(fabricText);
      });

      // Render the updated canvas
      canvas.renderAll();
    }
  }, [videoConfig.text, canvas]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasEdit;
