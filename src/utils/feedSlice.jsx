import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return state.filter(
        (feed) => feed._id.toString() !== action.payload.toString()
      );
    },
    removeFullFeed: (state, action) => {
      return [];
    },
  },
});

export const { addFeed, removeFeed, removeFullFeed } = feedSlice.actions;
export default feedSlice.reducer;
