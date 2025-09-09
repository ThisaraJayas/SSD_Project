import { createSlice } from "@reduxjs/toolkit";
import { createComment } from "../Comment/CommentAction.ts";
import { createReply } from "./ReplyAction.ts";


export interface Reply{
    _id:string,
    reply:string,
    createdDateTime: Date,
    user: {
        _id: string;
        email:string;
        firstName: string;
        lastName: string;
    };
    message:{
        _id: string;
        user: {
            _id: string;
            email:string;
            firstName: string;
            lastName: string;
        }
    }
}

interface ReplyState{
    reply:Reply,
    allReply:Reply[],
    status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState:ReplyState={
    status: "idle",
    reply: undefined,
    allReply: []
}
export const ReplySlice = createSlice({
    name:"reply",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createReply.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(createReply.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.reply=action.payload
        })
    }

})
export default ReplySlice.reducer