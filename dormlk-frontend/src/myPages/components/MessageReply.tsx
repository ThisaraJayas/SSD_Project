import { createReply } from '@/Redux/Reply/ReplyAction.ts';
import { AppDispatch, RootState } from '@/Redux/store.ts';
import { Button, Textarea } from '@chakra-ui/react'
import { Reply, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MessageReply({messageId, onNewReply }) {
    const [messageReply, setMessageReply]=useState('')
    const dispatch = useDispatch<AppDispatch>()
    const {reply} =useSelector((state:RootState)=>state.Reply)
    
    console.log(messageReply);
    console.log(messageId);
    
    
    const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newReply = { messageId, reply: messageReply };
        const result = await dispatch(createReply(newReply));
        if (result) {
          // Clear the textarea
          setMessageReply('');
          // Trigger the callback to update the parent component
          onNewReply(messageId, result.payload);
        }
  };
    
  return (
    <div>
        <form onSubmit={handleReplySubmit}>
         <Textarea
                    value={messageReply}
                    onChange={(e) => setMessageReply(e.target.value)}
                    placeholder="Enter your property description here."
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">
              Reply <Reply className="ml-1 h-4" />
            </Button>
                  </form>
    </div>
  )
}
