import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllPostsAdmin = createAsyncThunk("getAllPostsAdmin",async()=>{
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("JWT not found");
    try{
        const {data}=await axios.get(`https://dormlkbackendmain.vercel.app/api/admin/allPosts`,{
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        console.log(data);
        
        return data
    }catch(error){
        console.log("Fetch Post by UserId Error : ",error);
    }
})


export const updatePostStatus = createAsyncThunk(
    "updatePostStatus",
    async ({ postId, newStatus }: { postId: string; newStatus: string }) => {
      console.log("New Status:", newStatus);
      console.log("Post ID:", postId);
  
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("JWT not found");
  
      try {
        const { data } = await axios.put(
          `https://dormlkbackendmain.vercel.app/api/admin/${postId}/status/${newStatus}`,
          {}, // empty data object for PUT request
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        return data;
      } catch (error) {
        console.error("Update Post Status Error:", error);
        throw error;
      }
    }
  );