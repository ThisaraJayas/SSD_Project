import { createSlice } from "@reduxjs/toolkit"
import { createComment, fetchCommentsByPostId } from "./CommentAction.ts"

export interface Comment{
    _id:string,
    content:string,
    createdDateTime: Date,
    starRating:number,
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}

interface CommentState{
    comment:Comment,
    allComment:Comment[]
    status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState:CommentState={
    comment: undefined,
    allComment: [],
    status: "idle"
}
export const CommentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createComment.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(createComment.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.comment=action.payload
        })
        builder.addCase(fetchCommentsByPostId.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchCommentsByPostId.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allComment=action.payload
        })
    }

})
export default CommentSlice.reducer