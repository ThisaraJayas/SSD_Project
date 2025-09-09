import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface Post {
    title: string;
    location: string;
    cityDistrict: string;
    description: string;
    price: string;
    mobileContact: string;
    emailContact: string;
    whatsappContact: string;
    availability: string;
    accommodationType: string;
    closeByLocation: string[]; // Update type if necessary
  suitableFor: string[]; // Update type if necessary
  facilities: string[]; // Update type if necessary
  images: string[];
}

export const createPost = createAsyncThunk("createPost",async(postData :Post)=>{
    console.log(postData);
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("JWT not found");
    try{
        const {data} = await axios.post(`https://dormlkbackendmain.vercel.app/api/posts`,postData,{
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        return data
    }catch(error){
        console.log("Create Post Error : ",error); 
        throw error
    }
    
})

export const fetchPostByDistrict = createAsyncThunk("fetchPostByDistrict", async(district : string)=>{
    try{
        const {data} = await axios.get(`https://dormlkbackendmain.vercel.app/api/posts/district/${district}`)
        return data
    }catch(error){
        console.log("Fetch Post by district Error : ",error); 
        throw error
    }
})

interface FilterPostBySearchParams {
    district: string;
    accommodationType: string;
  }

export const filterPostBySearchFilter = createAsyncThunk("filterPostBySearchFilter", async(params: FilterPostBySearchParams)=>{
    const { district, accommodationType } = params;
    try{
        const {data} = await axios.get(`https://dormlkbackendmain.vercel.app/api/posts/search`, 
            {
                params: {district, accommodationType},
            }
        )
        return data
    }catch(error){
        console.log("Fetch by search error ",error);
        throw error;
    }
})

export const fetchAllPosts = createAsyncThunk("fetchAllPosts", async()=>{
    try{
        const {data} = await axios.get(`https://dormlkbackendmain.vercel.app/api/posts`)
        return data
    }catch(error){
        console.log("Fetch Post Error : ",error); 
        throw error
    }
})

export const fetchPostByHouseType = createAsyncThunk("fetchPostByHouseType", async(accommodationType : string)=>{
    try{
        const {data} = await axios.get(`https://dormlkbackendmain.vercel.app/api/posts/accommodationType/${accommodationType}`)
        return data
    }catch(error){
        console.log("Fetch Post by Houe Type Error : ",error); 
    }
})

export const fetchPostsByUserId = createAsyncThunk("fetchPostsByUserId",async(userId : string)=>{
    try{
        const {data}=await axios.get(`https://dormlkbackendmain.vercel.app/api/posts/posts/${userId}`)
        return data
    }catch(error){
        console.log("Fetch Post by UserId Error : ",error);
    }
})

export const fetchPostsByPostId = createAsyncThunk("fetchPostsByPostId",async(postId :string)=>{
    try{
        const {data}=await axios.get(`https://dormlkbackendmain.vercel.app/api/posts/${postId}`)
        console.log(data);
        
        return data
    }catch(error){
        console.log("Fetch Post by Postid Error : ",error);
    }
})

export const DeleteByPostId = createAsyncThunk("post/DeleteByPostId",async(postId : string)=>{
    try{
        const jwt = localStorage.getItem("jwt");
        if (!jwt) throw new Error("JWT not found");
        const {data}=await axios.delete(`https://dormlkbackendmain.vercel.app/api/posts/${postId}`,{
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        console.log(data);
        
        return data
    }catch(error){
        console.log("delete Post by PostId Error : ",error);
    }
})