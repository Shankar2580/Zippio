import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  isConnected: boolean;
  username?: string;
  lastSync?: string;
  postingEnabled: boolean;
  defaultSettings: {
    autoPost: boolean;
    includeWatermark: boolean;
    customMessage: string;
    hashtags: string[];
  };
}

export interface PostingJob {
  id: string;
  videoId: string;
  platforms: string[];
  status: 'pending' | 'posting' | 'completed' | 'failed';
  results: {
    [platformId: string]: {
      status: 'success' | 'failed';
      postUrl?: string;
      error?: string;
    };
  };
  createdAt: string;
  completedAt?: string;
}

interface SocialMediaState {
  platforms: SocialMediaPlatform[];
  postingJobs: PostingJob[];
  isPosting: boolean;
  selectedPlatforms: string[];
}

const initialPlatforms: SocialMediaPlatform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '🎥',
    color: '#FF0000',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: true,
      customMessage: 'Check out my latest video created with KiwiEcoNet!',
      hashtags: ['#video', '#content', '#kiwieconet'],
    },
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: true,
      customMessage: 'New video created with AI-powered editing!',
      hashtags: ['#video', '#ai', '#editing'],
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: true,
      customMessage: 'AI-enhanced video content ✨',
      hashtags: ['#video', '#ai', '#content', '#instagram', '#reels'],
    },
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: '🐦',
    color: '#1DA1F2',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: false,
      customMessage: 'Just created this amazing video with @KiwiEcoNet! 🎬',
      hashtags: ['#video', '#ai', '#contentcreation'],
    },
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: true,
      customMessage: 'Professional video content created with AI assistance.',
      hashtags: ['#video', '#professional', '#ai', '#content'],
    },
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: false,
      customMessage: 'AI-powered video magic! ✨',
      hashtags: ['#ai', '#video', '#fyp', '#viral', '#tech'],
    },
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: '📌',
    color: '#BD081C',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: true,
      customMessage: 'Creative video content inspiration',
      hashtags: ['#video', '#creative', '#inspiration'],
    },
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: '🤖',
    color: '#FF4500',
    isConnected: false,
    postingEnabled: true,
    defaultSettings: {
      autoPost: false,
      includeWatermark: false,
      customMessage: 'Check out this AI-enhanced video!',
      hashtags: [],
    },
  },
];

const initialState: SocialMediaState = {
  platforms: initialPlatforms,
  postingJobs: [],
  isPosting: false,
  selectedPlatforms: [],
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    connectPlatform: (state, action: PayloadAction<{ platformId: string; username: string }>) => {
      const platform = state.platforms.find(p => p.id === action.payload.platformId);
      if (platform) {
        platform.isConnected = true;
        platform.username = action.payload.username;
        platform.lastSync = new Date().toISOString();
      }
    },
    disconnectPlatform: (state, action: PayloadAction<string>) => {
      const platform = state.platforms.find(p => p.id === action.payload);
      if (platform) {
        platform.isConnected = false;
        platform.username = undefined;
        platform.lastSync = undefined;
      }
    },
    updatePlatformSettings: (state, action: PayloadAction<{ platformId: string; settings: Partial<SocialMediaPlatform['defaultSettings']> }>) => {
      const platform = state.platforms.find(p => p.id === action.payload.platformId);
      if (platform) {
        platform.defaultSettings = { ...platform.defaultSettings, ...action.payload.settings };
      }
    },
    togglePlatformPosting: (state, action: PayloadAction<string>) => {
      const platform = state.platforms.find(p => p.id === action.payload);
      if (platform) {
        platform.postingEnabled = !platform.postingEnabled;
      }
    },
    setSelectedPlatforms: (state, action: PayloadAction<string[]>) => {
      state.selectedPlatforms = action.payload;
    },
    startPosting: (state, action: PayloadAction<PostingJob>) => {
      state.isPosting = true;
      state.postingJobs.unshift(action.payload);
    },
    updatePostingJob: (state, action: PayloadAction<{ jobId: string; updates: Partial<PostingJob> }>) => {
      const job = state.postingJobs.find(j => j.id === action.payload.jobId);
      if (job) {
        Object.assign(job, action.payload.updates);
      }
    },
    completePosting: (state, action: PayloadAction<string>) => {
      state.isPosting = false;
      const job = state.postingJobs.find(j => j.id === action.payload);
      if (job) {
        job.status = 'completed';
        job.completedAt = new Date().toISOString();
      }
    },
  },
});

export const {
  connectPlatform,
  disconnectPlatform,
  updatePlatformSettings,
  togglePlatformPosting,
  setSelectedPlatforms,
  startPosting,
  updatePostingJob,
  completePosting,
} = socialMediaSlice.actions;

export default socialMediaSlice.reducer;