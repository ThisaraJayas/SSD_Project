import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsAdmin, updatePostStatus } from "./AdminPostAction.ts";

export interface Post{
    _id:string,
    title:string,
    description:string,
    location:string,
    facilities:[],
    suitableFor:[],
    closeByLocation:[],
    cityDistrict:string,ss
    accommodationType:string,
    availability:string,
    mobileContact: string;
    emailContact: string;
    postStatus: string;
    whatsappContact: string;
    price: string;
    noOfBed:string;
    noOfBathroom:string;
    images: string[];
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}
interface PostState{
    adminPost:Post,
    allAdminPost:Post[]
    status: "idle" | "loading" | "succeeded" | "failed"
}
const initialState:PostState={
    adminPost: undefined,
    allAdminPost: [],
    status: "idle",
}


export const AdminPostSlice = createSlice({
    name:"adminPost",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllPostsAdmin.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(getAllPostsAdmin.fulfilled,(state, action)=>{
            state.status='succeeded',
            state.allAdminPost=action.payload
            console.log("All ",action.payload);
        })
        builder.addCase(getAllPostsAdmin.rejected,(state)=>{
            state.status='failed'
        })
        builder.addCase(updatePostStatus.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(updatePostStatus.fulfilled,(state, action)=>{
            state.status='succeeded';
            const index = state.allAdminPost.findIndex(
                (post) => post._id === action.payload.id
              );
              if (index !== -1) {
                // Replace the old post with the updated one
                state.allAdminPost[index] = action.payload;
              }
        })
        builder.addCase(updatePostStatus.rejected,(state)=>{
            state.status='failed'
        })
    }
})
export default AdminPostSlice.reducer