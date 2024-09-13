import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type TabType = 'home' | 'following' | 'friends';
export interface TabState {
  tab: TabType;
}

const initialState: TabState = {
  tab: 'home',
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<TabType>) {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = tabSlice.actions;
export default tabSlice.reducer;
