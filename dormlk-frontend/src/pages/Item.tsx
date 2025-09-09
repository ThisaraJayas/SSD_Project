import ItemBreadChumb from "@/PageComponents/ItemBreadChumb.tsx";
import React, { useEffect, useRef, useState } from "react";
import "../styles/item.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { useParams } from "react-router-dom";
import { fetchPostsByPostId } from "@/Redux/Post/PostAction.ts";
import ChakraCarousel from "@/PageComponents/ChakraCarousel.tsx";
import Comment from "../PageComponents/Comment.tsx";
import StarRatings from 'react-star-ratings'; 
import { Textarea } from "@/components/ui/textarea.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Label } from "@/components/ui/label.tsx"

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Flex,
  Image,
  Box,
  Spinner,
} from "@chakra-ui/react";
import ReviewCard, { averageRating } from "@/PageComponents/ReviewCard.tsx";
import { fetchCommentsByPostId } from "@/Redux/Comment/CommentAction.ts";
import { Contact2Icon, MessageCircleMore, Send, Telescope } from "lucide-react";
import { createMessage } from "@/Redux/Messages/MessageAction.ts";

var totalComments = 0;
export default function Item() {
  const dispatch = useDispatch<AppDispatch>();
  const { itemPost } = useSelector((state: RootState) => state.Post);
  const { message } = useSelector((state: RootState) => state.Message);

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const { allComment } = useSelector((state: RootState) => state.Comment);

  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [messageText, setMessageText] = useState('');

 totalComments = allComment.length

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageId: string = String(id);
        dispatch(createMessage({ postId: messageId, firstName, email, mobileNo, message: messageText })); 
  };
  console.log("Send Message ",message);
  

  useEffect(() => {
    const Id: string = String(id);
    dispatch(fetchCommentsByPostId(Id));
  }, [dispatch, id]);

console.log("RRR ",totalComments);

  useEffect(() => {
    if (id) {
      const Id: string = String(id);
      dispatch(fetchPostsByPostId(Id));
    }
  }, [dispatch, id]);

  console.log(itemPost);

  useEffect(() => {
    if (itemPost && itemPost.images && itemPost.images.length > 0) {
      setSelectedImage(itemPost.images[0]); // Set the first image as the default selected image
    }
  }, [itemPost]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };
  // Add a loading or error state if necessary
  if (!itemPost) {
    return <div>Loading...</div>; // You can replace this with a more sophisticated loading indicator
  }

  return (
    <div>
      <section className="py-12 mt-6 sm:py-16">
        <div className="container mx-auto px-4">
          <ItemBreadChumb />
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <ChakraCarousel gap='1'>
                    {itemPost.images &&
                      itemPost.images.map((image, index) => (
                        <div
                          key={index}
                          className={`flex-shrink-0 w-full h-[400px] overflow-hidden rounded-lg`}
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={image}
                            alt={`Large view ${index}`}
                            onClick={() => handleThumbnailClick(image)}
                          />
                        </div>
                      ))}
                  </ChakraCarousel>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-4xl font-bold text-gray-900 sm:text-4xl">
                {itemPost.title}
              </h1>
              <h1 className="sm: text-1xl text-gray-600 sm:text-1xl">
                {itemPost.location}
              </h1>

              <div className="mt-5 flex items-center">
                <div className="flex items-center">
                <StarRatings
                  rating={averageRating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="1px"
                />
                <span className="ml-1 mt-1 text-sm">({averageRating.toFixed(1)})</span>
                </div>
                
              
               
              
            
            
                <p className="ml-4 mt-1 text-sm font-medium text-gray-500">
                  {totalComments} Reviews
                </p>
              </div>

              <h2 className="mt-8 text-base text-gray-900">Facilities</h2>
              <div className="mt-3 flex  flex-wrap items-center gap-1">
                {itemPost.facilities &&
                  itemPost.facilities.map((facitites, index) => (
                    <label key={index} className="">
                      <p className="bg-emerald-600 text-white rounded-lg border border-emerald-600 px-6 py-2 font-bold">
                        {facitites}
                      </p>
                    </label>
                  ))}
              </div>

              <h2 className="mt-8 text-base text-gray-900">House Details</h2>

              <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                <label className="">
                  <input
                    type="radio"
                    name="subscription"
                    value="4 Months"
                    className="peer sr-only"
                  />
                  <p className="bg-white text-emerald-600 rounded-lg border border-emerald-600 px-6 py-2 font-bold">
                    {itemPost.accommodationType}
                  </p>
                </label>
                <label className="">
                  <input
                    type="radio"
                    name="subscription"
                    value="4 Months"
                    className="peer sr-only"
                  />
                  <p className="bg-white text-emerald-600 rounded-lg border border-emerald-600 px-6 py-2 font-bold">
                    {itemPost.noOfBathroom} Beds
                  </p>
                </label>
                <label className="">
                  <input
                    type="radio"
                    name="subscription"
                    value="8 Months"
                    className="peer sr-only"
                    checked
                  />
                  <p className="bg-white text-emerald-600 rounded-lg border border-emerald-600 px-6 py-2 font-bold">
                    {itemPost.noOfBathroom} Bathrooms
                  </p>
                </label>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">{itemPost.price}</h1>
                  <span className="text-base">/month</span>
                </div>

                {/* <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-emerald-600 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-emerald-700"
                >
                  <MessageCircleMore className="mr-2"/>
                    Enquire
                </button> */}
                {/* <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button                   className="inline-flex items-center h-13 justify-center rounded-md border-2 border-transparent bg-emerald-600 bg-none px-12 py-3 text-center text-base font-bold text-white hover:text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-emerald-700"
 variant="outline"><MessageCircleMore className="mr-2"/>
                    Enquire</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-2xl ">Enquire Now</AlertDialogTitle>
          <AlertDialogDescription>
          Spot-on choice and perfect timing! Your home is just a few steps away. Enquiry is absolutely free.
          </AlertDialogDescription>
          <AlertDialogDescription>
          
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> */}
    <Dialog>
      <DialogTrigger asChild>
      <Button                   className="inline-flex items-center h-13 justify-center rounded-md border-2 border-transparent bg-emerald-600 bg-none px-12 py-3 text-center text-base font-bold text-white hover:text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-emerald-700"
 variant="outline"><MessageCircleMore className="mr-2"/>
                    Enquire</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[325px] mr-4 ml-4 ">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl" >Enquire Now</DialogTitle>
          <DialogDescription>
          Spot-on choice and perfect timing! Your home is just a few steps away. Enquiry is absolutely free.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleMessageSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name" className="text-left">
                Full Name
              </Label>
              <Input
                id="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter full name"
                className="col-span-1"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="col-span-1"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="mobile" className="text-left">
                Mobile Number
              </Label>
              <Input
                id="mobile"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder="Enter mobile no"
                className="col-span-1"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="message" className="text-left">
                Message
              </Label>
              <Textarea
                id="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here."
                className="col-span-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">
              Send <Send className="ml-1 h-4" />
            </Button>
          </DialogFooter>
        </form>
        
      </DialogContent>
    </Dialog>
              </div>
              <h2 className="mt-4 text-base text-gray-900">Contact Details</h2>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className=""
                    ></path>
                  </svg>
                  Email : {itemPost.emailContact}
                </li>

                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      className=""
                    ></path>
                  </svg>
                  Mobile : {itemPost.mobileContact}
                </li>
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      className=""
                    ></path>
                  </svg>
                  WhatsApp : {itemPost.whatsappContact}
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              {/* <nav className="flex gap-4"> */}
              {/* <a
                    href="#"
                    title=""
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  >
                    {" "}
                    Description{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                  >
                    Reviews
                    <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                      {" "}
                      1,209{" "}
                    </span>
                  </a>
                </nav> */}
              <Tabs>
                <TabList>
                  <Tab
                    sx={{
                      _selected: {
                        color: "black",
                        borderBottomColor: "black",
                      },
                    }}
                  >
                    <p
                      title=""
                      className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                    >
                      {" "}
                      Description{" "}
                    </p>
                  </Tab>
                  <Tab
                    sx={{
                      _selected: {
                        color: "black",
                        borderBottomColor: "black",
                      },
                    }}
                  >
                    <p
                      title=""
                      className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                    >
                      Reviews
                      <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                        {" "}
                       {totalComments}{" "}
                      </span>
                    </p>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="mt-8 flow-root sm:mt-12">
                      <h1 className="text-3xl font-bold">
                      About the Property
                      </h1>
                      <p className="mt-4">District : {itemPost.cityDistrict}</p>
                      {/* <p className="">Suitable For : 
                        {itemPost.suitableFor.map((sutiablefor,index)=>(
                          <span key={index}>
                            { sutiablefor} ,
                          </span>
                        ))} */}
                      {/* </p> */}
                      <p>Suitable For : {itemPost.suitableFor.join(', ')}</p>
                      <p>Property Close to : {itemPost.closeByLocation.join(', ')}</p>
                      <p>Facilities Available : {itemPost.facilities.join(', ')}</p>
                      <h1 className="text-1xl mt-5 mb-2 font-bold">
                      Description
                      </h1>
                      <p className="">{itemPost.description}</p>

                      {/* {itemPost.facilities &&
                  itemPost.facilities.map((facitites, index) => (
                    <label key={index} className="">
                      <p className="bg-emerald-600 text-white rounded-lg border border-emerald-600 px-6 py-2 font-bold">
                        {facitites}
                      </p>
                    </label>
                  ))} */}
                      {/* <h1 className="mt-8 text-3xl font-bold">Description of Property</h1>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
          <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p> */}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <ReviewCard postId={id} />
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <div className="border-b mt-7 border-gray-300"></div>
              <div className="flow-root sm:mt-12">
                <h1 className="text-2xl font-bold">Write your Review</h1>
                <Comment postId={id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
