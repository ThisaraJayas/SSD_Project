import { createSlice } from "@reduxjs/toolkit";
import { createComment } from "../Comment/CommentAction.ts";
import { createMessage, fetchMessagesByUserId, fetchRecivedMessages } from "./MessageAction.ts";

export interface Message{
    _id:string,
    fullName:string,
    email: string,
    mobileNo:number,
    createdDateTime: Date,
    message:string,
    user: {
        _id: string;
        email:string;
        firstName: string;
        lastName: string;
    };
    replies:{
        _id:string,
        reply:string,
        createdDateTime: Date,
        user: {
            _id: string;
            firstName: string;
            lastName: string;
        };
    }[]; 
    post:{
        _id:string,
        title:string,
        cityDistrict:string,
        user:{
            _id: string;
            email:string;
            firstName: string;
            lastName: string;
        }
    }
}

interface MessageState{
    message:Message,
    allMessage:Message[],
    messagesRecived:Message[],
    status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState:MessageState={
    message: undefined,
    allMessage: [],
    status: "idle",
    messagesRecived: []
}
export const MessageSlice = createSlice({
    name:"messages",
    initialState,
    reducers:{
        // Action to add a reply to a specific message
        updateMessageWithReply: (state, action) => {
            const { messageId, reply } = action.payload;
            const message = state.allMessage.find(msg => msg._id === messageId);
            if (message) {
                message.replies.push(reply);
            }
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(createMessage.pending,(state,action)=>{
            state.status='loading'
        })
        builder.addCase(createMessage.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allMessage.push(action.payload);
        })
        builder.addCase(fetchMessagesByUserId.pending,(state,action)=>{
            state.status='loading'
        })
        builder.addCase(fetchMessagesByUserId.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allMessage=action.payload
        })
        builder.addCase(fetchRecivedMessages.pending,(state,action)=>{
            state.status='loading'
        })
        builder.addCase(fetchRecivedMessages.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.messagesRecived=action.payload
        })
    }

})
export const { updateMessageWithReply } = MessageSlice.actions;
export default MessageSlice.reducer