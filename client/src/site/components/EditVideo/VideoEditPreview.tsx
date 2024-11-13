// src/components/EditVideo/VideoEditPreview.tsx

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { videoConfigSelector } from '@/redux/selector';
import { TextConfig } from '@/models/videoEdit';
interface VideoEditPreviewProps {
  videoUrl: string;
}

const VideoEditPreview: React.FC<VideoEditPreviewProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoConfig = useSelector(videoConfigSelector);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!video || !canvas || !ctx) return;
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });
    const draw = () => {
      if (video.paused || video.ended) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      videoConfig.text?.forEach((text: TextConfig) => {
        drawTextOverlay(ctx, text);
      });

      requestAnimationFrame(draw);
    };
    video.addEventListener('play', () => {
      draw();
    });
    return () => {
      video.removeEventListener('play', draw);
    };
  }, [videoUrl, videoConfig.text]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain shadow-md"
        controls={false}
        autoPlay
        muted
      ></video>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></canvas>
    </div>
  );
};
const drawTextOverlay = (ctx: CanvasRenderingContext2D, text: TextConfig) => {
  const {
    content,
    position,
    fontFamily,
    fontSize = 24,
    color = '#FFFFFF',
    opacity = 1,
    fontStyle = 'normal',
    animation,
    duration,
  } = text;

  ctx.save();

  ctx.globalAlpha = opacity;
  ctx.font = `${fontStyle} ${fontSize}px ${getFontFamily(fontFamily)}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  let x: number;
  let y: number;

  if (typeof position.x === 'number') {
    x = position.x;
  } else {
    const canvasWidth = ctx.canvas.width;
    x = (parseFloat(position.x) / 100) * canvasWidth;
  }

  if (typeof position.y === 'number') {
    y = position.y;
  } else {
    const canvasHeight = ctx.canvas.height;
    y = (parseFloat(position.y) / 100) * canvasHeight;
  }

  ctx.fillText(content, x, y);

  ctx.restore();
};
const getFontFamily = (fontFamily: string | undefined): string => {
  switch (fontFamily) {
    case 'mono':
      return `'Geist Mono', monospace`;
    case 'playfair':
      return `'Playfair Display', serif`;
    case 'kanit':
      return `'Kanit', sans-serif`;
    case 'dancing':
      return `'Dancing Script', cursive`;
    case 'sans':
    default:
      return `'Open Sans', sans-serif`;
  }
};

export default VideoEditPreview;
