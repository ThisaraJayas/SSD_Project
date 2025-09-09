import React, { useEffect, useState } from "react";
import im1 from "../styles/home1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { fetchCommentsByPostId } from "@/Redux/Comment/CommentAction.ts";
import { Box, Button, Flex, Input, Text, SimpleGrid } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings'; 

const ITEMS_PER_PAGE = 5;
export var totalComments = 0;
export var averageRating = 0;
export default function ReviewCard({ postId }) {
  const dispatch = useDispatch<AppDispatch>();
  const { allComment } = useSelector((state: RootState) => state.Comment);
  const [currentPage, setCurrentPage] = useState(1);
 totalComments = allComment.length
  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId]);

  console.log("COOO: ", averageRating.toFixed(1));
//average rating of full post
  const validRatings = allComment.filter(comment => comment.starRating !== null);
  const totalRatingSum = validRatings.reduce((sum, comment) => sum + comment.starRating, 0);
  averageRating = validRatings.length > 0 ? (totalRatingSum / validRatings.length) : 0;


  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  const sortedComments = [...allComment].sort(
    (a, b) => new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime());

  // const sortedComments = [...allComment].sort(
  //   (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
  // );
  const totalPages = Math.ceil(sortedComments.length / ITEMS_PER_PAGE);
  const currentItems = sortedComments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  return (
    <div>
      {currentItems.map((comment, index) => (
        <div
          key={index}
          className="mx-auto my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8"
        >
          <img
            className="mr-5 block h-10 w-10 max-w-full text-left rounded-full align-middle sm:h-16 sm:w-16"
            src={im1}
            alt="Profile Picture"
          />
          <div className="w-full text-left">
            <div className=" flex flex-col justify-between text-gray-600 sm:flex-row">
              <h3 className="font-medium">
                {comment.user.firstName} {comment.user.lastName}
              </h3>
              <time className="text-xs" dateTime={new Date(comment.createdDateTime).toISOString()}>
                               {formatDateTime(String(comment.createdDateTime))}
                            </time>{" "}
              
            </div>
            {comment.starRating !== null && (
              <div className="flex items-center mb-4">
                <StarRatings
                  rating={comment.starRating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="1px"
                />
                <span className="ml-2 text-sm">{comment.starRating.toFixed(1)}</span>
              </div>
            )}
            <p className="text-sm">
             {comment.content}
            </p>
            <div className="mt-5 flex items-center justify-between text-gray-600"></div>
          </div>
        </div>
      ))}
      <Flex justify="center" align="center">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          mr={2}
        >
          Previous
        </Button>
        <Text mx={4}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          ml={2}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
}
