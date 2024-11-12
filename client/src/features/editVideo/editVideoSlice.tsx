type TextConfig = {
  content: string;
  position: string; // e.g., "10:10" for pixel coordinates or "50%:50%" for percentage
  fontSize?: number; // Default: 24
  color?: string; // Default: "white"
  fontStyle?: 'normal' | 'italic' | 'bold'; // Text style
  opacity?: number; // Default: 1 (range: 0 to 1)
  animation?: 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut'; // Text animations
  duration?: number; // Duration in seconds
};

type FilterConfig = {
  eq?: {
    brightness?: number; // Default: 0
    contrast?: number; // Default: 1
    saturation?: number; // Default: 1
    gamma?: number; // Default: 1
  };
  hue?: {
    saturation?: number; // Default: 1 (0 for grayscale)
  };
  unsharp?: {
    luma_msize_x?: number; // Default: 5
    luma_msize_y?: number; // Default: 5
    luma_amount?: number; // Default: 1
  };
  boxblur?: {
    luma_radius?: number; // Default: 2
    luma_power?: number; // Default: 1
  };
  colorchannelmixer?: {
    rr?: number; // Default: 0.393
    rg?: number; // Default: 0.769
    rb?: number; // Default: 0.189
    gr?: number; // Default: 0.349
    gg?: number; // Default: 0.686
    gb?: number; // Default: 0.168
    br?: number; // Default: 0.272
    bg?: number; // Default: 0.534
    bb?: number; // Default: 0.131
  };
  crop?: {
    out_w?: number; // Default: 640
    out_h?: number; // Default: 480
    x?: number; // Default: 0
    y?: number; // Default: 0
  };
  rotate?: {
    angle?: string; // Default: "0" (e.g., "PI/4" for 45 degrees)
  };
  fade?: {
    type?: 'in' | 'out'; // Default: "in"
    start_time?: number; // Default: 0
    duration?: number; // Default: 3
  };
  colorEffect?: 'grayscale' | 'sepia' | 'negative' | 'vintage'; // Color effects
};

type TransitionConfig = {
  type: 'fade' | 'slide' | 'wipe' | 'zoom'; // Transition types
  duration: number; // Duration in seconds
  direction?: 'left' | 'right' | 'top' | 'bottom'; // Direction for sliding transitions
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // Easing functions
};

type AudioConfig = {
  muteSound?: boolean;
  addSound?: {
    filePath: string;
    startAt: number;
    volume?: number; // Default: 1
  };
  adjustVolume?: number; // e.g., 0.5 for 50%, 1.5 for 150%
  fadeInOut?: {
    fadeIn?: boolean;
    fadeOut?: boolean;
    duration?: number; // Default: 3 seconds
  };
};

type OverlayConfig = {
  imagePath: string;
  position: string; // e.g., "10:10" for pixels or "50%:50%" for center
  opacity?: number; // Default: 1 (range: 0 to 1)
  scale?: number; // Default: 1
  rotation?: number; // Degrees
};

type SubtitleConfig = {
  filePath: string;
  fontSize?: number; // Default: 24
  color?: string; // Default: "white"
  backgroundColor?: string; // Optional
  position?: 'bottom' | 'top' | 'center'; // Default: 'bottom'
};

type CutConfig = {
  start: number; // Start time in seconds
  end: number; // End time in seconds
  split?: boolean; // Split at multiple points for scene separation
};

type EffectConfig = {
  slowMotion?: { speed: number }; // e.g., { speed: 2.0 }
  reverse?: boolean; // Reverse effect
  zoom?: { level: number; duration: number }; // e.g., { level: 1.5, duration: 25 }
  fade?: { type: 'in' | 'out'; start: number; duration: number };
  blur?: { radius: number; power: number }; // e.g., { radius: 5, power: 1 }
  vignette?: { angle: number; intensity: number };
  colorEffect?: 'grayscale' | 'sepia'; // Predefined color effects
};

type VideoEditConfig = {
  text?: TextConfig[];
  filter?: FilterConfig;
  effect?: EffectConfig;
  transition?: TransitionConfig;
  subtitle?: SubtitleConfig;
  overlay?: OverlayConfig[];
  audio?: AudioConfig;
  cutVideo?: CutConfig;
  mergeWith?: { filePath: string };
  exportType?: 'mp4' | 'avi' | 'mov' | 'mkv'; // Default: 'mp4'
  aspectRatio?: string; // e.g., "16:9", "4:3"
  keyframes?: any; // Placeholder for keyframe animations
};
