import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice.ts";
import PostReducer from "./Post/PostSlice.ts";
import AdminPostReducer from "./Admin/AdminPostSlice.ts";
import CommentReducer from "./Comment/CommentSlice.ts";
import MessageReducer from "./Messages/MessageSlice.ts";
import ReplyReducer from "./Reply/ReplySlice.ts";

export const store = configureStore({
  reducer: {
    User:AuthReducer,
    Post:PostReducer,
    AdminPost:AdminPostReducer,
    Comment:CommentReducer,
    Message:MessageReducer,
    Reply:ReplyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;