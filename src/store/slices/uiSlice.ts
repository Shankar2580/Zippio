import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  }>;
}

const initialState: UiState = {
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<UiState['notifications'][0], 'id'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { toggleTheme, setSidebarOpen, addNotification, removeNotification } = uiSlice.actions;
export default uiSlice.reducer;