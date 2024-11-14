// src/store/editVideoSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  VideoEditConfig,
  TextConfig,
  FilterConfig,
  EffectConfig,
  TransitionConfig,
  AudioConfig,
  OverlayConfig,
  SubtitleConfig,
  CutConfig,
  VideoInfo,
  Keyframe,
} from '@/models/videoEdit';
import { Canvas } from 'fabric/fabric-impl';

// Initial state definition with default values
export type InitStateEditVideoType = {
  videoInfo: VideoInfo;
  videoConfig: VideoEditConfig;
};
const initialState: InitStateEditVideoType = {
  videoInfo: {
    width: 0,
    height: 0,
  },
  videoConfig: {
    text: [],
    filter: undefined,
    effect: undefined,
    transition: undefined,
    subtitle: undefined,
    overlay: [],
    audio: undefined,
    cutVideo: undefined,
    mergeWith: undefined,
    exportType: 'mp4',
    aspectRatio: '',
    keyframes: [],
  },
};

const editVideoSlice = createSlice({
  name: 'editVideo',
  initialState,
  reducers: {
    setVideoEditConfig(state, action: PayloadAction<VideoEditConfig>) {
      state.videoConfig = {
        ...initialState.videoConfig,
        ...action.payload,
        text: action.payload.text ?? [],
        overlay: action.payload.overlay ?? [],
        keyframes: action.payload.keyframes ?? [],
      };
    },

    setVideoInfo(state, action: PayloadAction<VideoInfo>) {
      state.videoInfo = action.payload;
    },

    setText(state, action: PayloadAction<TextConfig[]>) {
      state.videoConfig.text = action.payload;
    },
    addText(state, action: PayloadAction<TextConfig>) {
      state.videoConfig.text.push(action.payload);
    },
    updateText(state, action: PayloadAction<TextConfig>) {
      const index = state.videoConfig.text.findIndex(
        (text) => text.id === action.payload.id
      );
      if (index !== -1) {
        state.videoConfig.text[index] = action.payload;
      }
    },
    removeText(state, action: PayloadAction<number>) {
      state.videoConfig.text = state.videoConfig.text.filter(
        (text) => text.id !== action.payload
      );
    },

    setFilter(state, action: PayloadAction<FilterConfig | undefined>) {
      state.videoConfig.filter = action.payload;
    },
    setEffect(state, action: PayloadAction<EffectConfig | undefined>) {
      state.videoConfig.effect = action.payload;
    },

    setTransition(state, action: PayloadAction<TransitionConfig | undefined>) {
      state.videoConfig.transition = action.payload;
    },
    setSubtitle(state, action: PayloadAction<SubtitleConfig | undefined>) {
      state.videoConfig.subtitle = action.payload;
    },

    setOverlay(state, action: PayloadAction<OverlayConfig[]>) {
      state.videoConfig.overlay = action.payload;
    },
    addOverlay(state, action: PayloadAction<OverlayConfig>) {
      state.videoConfig.overlay.push(action.payload);
    },
    updateOverlay(state, action: PayloadAction<OverlayConfig>) {
      const index = state.videoConfig.overlay.findIndex(
        (overlay) => overlay.id === action.payload.id
      );
      if (index !== -1) {
        state.videoConfig.overlay[index] = action.payload;
      }
    },
    removeOverlay(state, action: PayloadAction<number>) {
      state.videoConfig.overlay = state.videoConfig.overlay.filter(
        (overlay) => overlay.id !== action.payload
      );
    },
    setAudio(state, action: PayloadAction<AudioConfig | undefined>) {
      state.videoConfig.audio = action.payload;
    },
    setCutVideo(state, action: PayloadAction<CutConfig | undefined>) {
      state.videoConfig.cutVideo = action.payload;
    },

    setMergeWith(
      state,
      action: PayloadAction<{ filePath: string } | undefined>
    ) {
      state.videoConfig.mergeWith = action.payload;
    },
    setExportType(state, action: PayloadAction<'mp4' | 'avi' | 'mov' | 'mkv'>) {
      state.videoConfig.exportType = action.payload;
    },
    setAspectRatio(state, action: PayloadAction<string>) {
      state.videoConfig.aspectRatio = action.payload;
    },
    setKeyframes(state, action: PayloadAction<Keyframe[]>) {
      state.videoConfig.keyframes = action.payload;
    },
    addKeyframe(state, action: PayloadAction<Keyframe>) {
      state.videoConfig.keyframes.push(action.payload);
    },
    updateKeyframe(state, action: PayloadAction<Keyframe>) {
      const index = state.videoConfig.keyframes.findIndex(
        (kf) => kf.time === action.payload.time
      );
      if (index !== -1) {
        state.videoConfig.keyframes[index] = action.payload;
      }
    },
    removeKeyframe(state, action: PayloadAction<number>) {
      state.videoConfig.keyframes = state.videoConfig.keyframes.filter(
        (kf) => kf.time !== action.payload
      );
    },

    resetVideoEditConfig() {
      return initialState;
    },
  },
});

export const {
  setVideoEditConfig,
  setVideoInfo,
  setText,
  addText,
  updateText,
  removeText,
  setFilter,
  setEffect,
  setTransition,
  setSubtitle,
  setOverlay,
  addOverlay,
  updateOverlay,
  removeOverlay,
  setAudio,
  setCutVideo,
  setMergeWith,
  setExportType,
  setAspectRatio,
  setKeyframes,
  addKeyframe,
  updateKeyframe,
  removeKeyframe,
  resetVideoEditConfig,
} = editVideoSlice.actions;

// Export reducer
export default editVideoSlice.reducer;
