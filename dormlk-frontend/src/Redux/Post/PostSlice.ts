import { createSlice } from "@reduxjs/toolkit";
import { createPost, DeleteByPostId, fetchAllPosts, fetchPostByDistrict, fetchPostByHouseType, fetchPostsByPostId, fetchPostsByUserId, filterPostBySearchFilter } from "./PostAction.ts";

export interface Post{
    _id:string,
    title:string,
    description:string,
    location:string,
    facilities:[],
    suitableFor:[],
    closeByLocation:[],
    cityDistrict:string,
    accommodationType:string,
    availability:string,
    mobileContact: string;
    emailContact: string;
    postStatus: string;
    whatsappContact: string;
    createdDateTime: Date,
    price: string;
    noOfBed:string;
    noOfBathroom:string;
    images: string[];
    user: {
        _id: string;
        email:string;
        firstName: string;
        lastName: string;
    };
}
interface PostState{
    post:Post,
    itemPost:Post,
    allPost:Post[]
    allPostByHouseType:Post[]
    allPostByUserId:Post[]
    status: "idle" | "loading" | "succeeded" | "failed"
}
const initialState:PostState={
    allPost: [],
    status: "idle",
    allPostByHouseType: [],
    allPostByUserId: [],
    itemPost: null,
    post: undefined
}
export const PostSlice = createSlice({
    name:"post",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createPost.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(createPost.fulfilled,(state, action)=>{
            state.status='succeeded',
            state.post=action.payload
        })
        builder.addCase(createPost.rejected,(state)=>{
            state.status='failed'
        })
        builder.addCase(fetchPostByDistrict.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchPostByDistrict.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allPost=action.payload
        })
        builder.addCase(filterPostBySearchFilter.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(filterPostBySearchFilter.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allPost=action.payload
        })
        builder.addCase(filterPostBySearchFilter.rejected , (state)=>{
            state.status='failed'
        })
        builder.addCase(fetchAllPosts.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchAllPosts.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allPost=action.payload
        })
        builder.addCase(fetchAllPosts.rejected , (state)=>{
            state.status='failed'
        })
        builder.addCase(fetchPostByHouseType.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchPostByHouseType.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allPostByHouseType=action.payload
        })
        builder.addCase(fetchPostsByUserId.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchPostsByUserId.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.allPostByUserId=action.payload
        })
        builder.addCase(fetchPostsByUserId.rejected , (state)=>{
            state.status='failed'
        })
        builder.addCase(fetchPostsByPostId .pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchPostsByPostId.fulfilled,(state,action)=>{
            state.status='succeeded',
            state.itemPost=action.payload
        })
        builder.addCase(fetchPostsByPostId.rejected , (state)=>{
            state.status='failed'
        })
        //delete
        builder.addCase(DeleteByPostId.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(DeleteByPostId.fulfilled,(state)=>{
            state.status='succeeded'
        })
        builder.addCase(DeleteByPostId.rejected , (state)=>{
            state.status='failed'
        })
    }

})
export default PostSlice.reducer