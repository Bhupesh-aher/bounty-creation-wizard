import { configureStore } from "@reduxjs/toolkit";
import bountyReducer from "../features/bounty/redux/bountySlice";

export const store = configureStore({
  reducer: {
    bounty: bountyReducer,
  },
});
