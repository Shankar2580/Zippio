import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Video API endpoints
export const videoAPI = {
  uploadVideo: async (file: File, metadata: {
    title: string;
    description?: string;
    tags?: string[];
  }) => {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getVideos: async (page = 1, limit = 10) => {
    const response = await api.get(`/videos?page=${page}&limit=${limit}`);
    return response.data;
  },

  getVideo: async (id: string) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  deleteVideo: async (id: string) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  processVideo: async (id: string, options: {
    enhance: boolean;
    addCaptions: boolean;
    addMusic: boolean;
    effects: string[];
  }) => {
    const response = await api.post(`/videos/${id}/process`, options);
    return response.data;
  },

  getProcessingStatus: async (id: string) => {
    const response = await api.get(`/videos/${id}/status`);
    return response.data;
  },
};

// Social Media API endpoints
export const socialAPI = {
  shareToPlatform: async (videoId: string, platform: string, options: {
    caption?: string;
    hashtags?: string[];
  }) => {
    const response = await api.post(`/social/share`, {
      videoId,
      platform,
      ...options,
    });
    return response.data;
  },

  getShareableLink: async (videoId: string) => {
    const response = await api.get(`/social/share/${videoId}`);
    return response.data;
  },
};

export default api;
