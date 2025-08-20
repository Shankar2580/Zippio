import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  email: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  videosProcessed: number;
  subscription: {
    status: 'active' | 'cancelled' | 'expired' | 'trial';
    expiresAt: string;
    videosRemaining: number;
    monthlyLimit: number;
  };
}

const initialState: UserState = {
  isAuthenticated: false,
  email: '',
  name: '',
  plan: 'starter',
  videosProcessed: 0,
  subscription: {
    status: 'trial',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days trial
    videosRemaining: 3,
    monthlyLimit: 10,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    incrementVideosProcessed: (state) => {
      state.videosProcessed += 1;
    },
  },
});

export const { setUser, incrementVideosProcessed } = userSlice.actions;
export default userSlice.reducer;