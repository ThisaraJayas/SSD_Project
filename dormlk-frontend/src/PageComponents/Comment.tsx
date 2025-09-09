import { createComment } from "@/Redux/Comment/CommentAction.ts";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from 'react-star-ratings';

export default function Comment({ postId }) {
  console.log("Commne tpost : ", postId);

  const dispatch = useDispatch<AppDispatch>()
  const {comment}=useSelector((state:RootState)=>state.Comment)
  const [content, setContent] = useState("");
  const [starRating, setRating] = useState(1);

  const {loginUser, status} =useSelector((state:RootState)=>state.User)
  const navigate = useNavigate()
 

  console.log(comment);
  console.log(starRating);


  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loginUser) {
          dispatch(createComment({ content, postId, starRating }));
          setContent("");
          setRating(0);
        }else{
          navigate('/login');
        }
         
  };
  const changeRating = (newRating: number) => {
    setRating(newRating); // Update rating state
  };
  return (
    <div>
      <div className="">
        
        <div className="mt-5 mx-auto max-w-screen-sm px-4">
          <div className="-ml-10 lg:-ml-20 flex p-4 text-left text-gray-700">
            <img
              className="mr-5 h-12 w-12 rounded-full"
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt=""
            />
            <div className="w-full space-y-3 text-gray-700">
              <form onSubmit={handleCommentSubmit}>
                <div className="">
                  <textarea
                    name="comment"
                    placeholder="Write your comment here"
                    cols={30}
                    rows={6}

                    className="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"                    value={content}
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
                <div className="my-2">
                  <StarRatings
                    rating={starRating}
                    starRatedColor="orange"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                    starSpacing="5px"
                  />
                </div>
                <div className="float-right my-2">
                  <input
                    type="submit"
                    value="Post Comment"
                    className="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-emerald-700 px-4 hover:bg-emerald-800 text-center text-sm font-medium normal-case text-white opacity-100 outline-none"                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
