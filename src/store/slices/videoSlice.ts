import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  downloadUrl?: string;
  processingProgress?: number;
}

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  uploadProgress: number;
  processingStep: 'upload' | 'music' | 'captions' | 'export' | 'completed';
  isUploading: boolean;
  isProcessing: boolean;
}

const initialState: VideoState = {
  videos: [],
  currentVideo: null,
  uploadProgress: 0,
  processingStep: 'upload',
  isUploading: false,
  isProcessing: false,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<Video>) => {
      state.currentVideo = action.payload;
    },
    addVideo: (state, action: PayloadAction<Video>) => {
      state.videos.push(action.payload);
    },
    updateVideo: (state, action: PayloadAction<Partial<Video> & { id: string }>) => {
      const index = state.videos.findIndex(video => video.id === action.payload.id);
      if (index !== -1) {
        state.videos[index] = { ...state.videos[index], ...action.payload };
      }
    },
    removeVideo: (state, action: PayloadAction<string>) => {
      state.videos = state.videos.filter(video => video.id !== action.payload);
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setProcessingStep: (state, action: PayloadAction<VideoState['processingStep']>) => {
      state.processingStep = action.payload;
    },
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
  },
});

export const {
  setCurrentVideo,
  addVideo,
  updateVideo,
  removeVideo,
  setUploadProgress,
  setProcessingStep,
  setIsUploading,
  setIsProcessing,
} = videoSlice.actions;

export default videoSlice.reducer;