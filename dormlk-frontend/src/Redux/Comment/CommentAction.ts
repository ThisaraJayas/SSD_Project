import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Comment {
    content: string;
    postId: number;
    starRating: number;
  }
export const createComment = createAsyncThunk("createComment",async(content : Comment)=>{
    console.log(content);
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("JWT not found");
    try{
        const {data} = await axios.post(`https://dormlkbackendmain.vercel.app/api/comments`, content,{
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        return data
    }catch(error){
        console.log("Create Comment Error : ",error); 
        throw error
    }
    
})

export const fetchCommentsByPostId = createAsyncThunk("fetchCommentsByPostId",async(postId : string)=>{
    console.log("PPP ",postId);
    
    try{
        const {data}=await axios.get(`https://dormlkbackendmain.vercel.app/api/comments/${postId}`)
        return data
    }catch(error){
        console.log("Fetch Comments by PostId Error : ",error);
    }
})