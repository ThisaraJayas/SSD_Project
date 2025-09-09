import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ReplyDetails {
    messageId: string;
    reply: string;
  }
export const createReply = createAsyncThunk("createReply",async(replyDetails :ReplyDetails)=>{
    console.log("reply detail ",replyDetails);
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("JWT not found");
    try{
        const {data} = await axios.post(`https://dormlkbackendmain.vercel.app/api/replies`, replyDetails,{
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        console.log("Reply Send Data ",data);
        
        return data

    }catch(error){
        console.log("Create Reply Error : ",error); 
        throw error
    }
    
})