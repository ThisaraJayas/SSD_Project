import React, { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Button,
} from "@chakra-ui/react";
import ReviewCard, { averageRating, totalComments } from "@/PageComponents/ReviewCard.tsx";
import homeImg from "../styles/home4.png";
import homeImg2 from "../styles/home2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { fetchPostByDistrict } from "@/Redux/Post/PostAction.ts";
import { TfiLocationPin } from "react-icons/tfi";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function HomeItems() {
  const dispatch = useDispatch<AppDispatch>();
  const { allPost, status } = useSelector((state: RootState) => state.Post);

  console.log(allPost);

  const handleTabChange = (district) => {
    console.log(district);

    dispatch(fetchPostByDistrict(district));
  };

  useEffect(() => {
    handleTabChange("Colombo");
  }, [dispatch]);
  return (
    <div>
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-10">
        <div className="mx-auto px-8 sm:px-12 lg:px-16">
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            onChange={(index) => {
              const districts = ["Colombo", "Kandy", "Jaffna", "Matara"];
              handleTabChange(districts[index]);
            }}
          >
            <TabList>
              <Tab>Colombo</Tab>
              <Tab>Kandy</Tab>
              <Tab>Jaffna</Tab>
              <Tab>Matara</Tab>
            </TabList>

            <TabPanels>
              {["Colombo", "Kandy", "Jaffna", "Matara"].map(
                (district, index) => (
                  <TabPanel key={index}>
                    <section className="flex flex-col items-center bg-white">
                      <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">
                        {status === "loading" ? (
                          <div className="flex justify-center">
                            <Spinner size="lg" />
                          </div>
                        ) : (
                          allPost.filter(post => post.postStatus === "ACCEPTED").slice(0,6).map((post) => (
                            <Link to={`/store/${post._id}`}>
                            <article className="mb-4 w-[500px] max-w-full overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
                              <div className="w-full h-48 overflow-hidden">
                                <img
                                  src={post.images[0]}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="p-4">
                                <div className="pb-1">
                                  <a
                                    href="#"
                                    className="text-lg hover:text-green-600 font-medium duration-500 ease-in-out"
                                  >
                                    {post.title}
                                  </a>
                                </div>
                                <div className="pb-6">
                                  <a
                                    href="#"
                                    className="flex items-center text-sm font-medium duration-500 ease-in-out"
                                  >
                                    <TfiLocationPin className="mr-2" />
                                    <span>{post.cityDistrict}</span>
                                  </a>
                                </div>
                                <ul className="box-border flex flex-wrap list-none border-t border-b border-solid border-gray-200 px-0 py-6">
                                {post.accommodationType && (
                                    <li className="mr-3 mb-2 flex items-center text-left bg-gray-100 p-2 rounded-md">
                                      <i className="mr-1 text-2xl text-green-600">
                                        {/* Cooking icon SVG */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                          />
                                        </svg>
                                      </i>
                                      <span className="text-sm">{post.accommodationType}</span>
                                    </li>
                                  )}
                                  {post.noOfBathroom && (
                                    <li className="mr-3 mb-2 flex items-center text-left bg-gray-100 p-2 rounded-md">
                                      <i className="mr-1 text-2xl text-green-600">
                                        {/* Cooking icon SVG */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                          />
                                        </svg>
                                      </i>
                                      <span className="text-sm">{post.noOfBed} Beds</span>
                                    </li>
                                  )}
                                  {post.noOfBathroom && (
                                    <li className="mr-3 mb-2 flex items-center text-left bg-gray-100 p-2 rounded-md">
                                      <i className="mr-1 text-2xl text-green-600">
                                        {/* Cooking icon SVG */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                          />
                                        </svg>
                                      </i>
                                      <span className="text-sm">{post.noOfBathroom} Bathroom</span>
                                    </li>
                                  )}
                                  {post.facilities.find(facility => facility === "Wi-Fi") && (
                                    <li className="mr-3 mb-2 flex items-center text-left bg-gray-100 p-2 rounded-md">
                                      <i className="mr-1 text-2xl text-green-600">
                                        {/* Cooking icon SVG */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                          />
                                        </svg>
                                      </i>
                                      <span className="text-sm">Wi-Fi</span>
                                    </li>
                                  )}
                                  {post.facilities.find(facility => facility === "Parking") && (
                                    <li className="mr-3 mb-2 flex items-center text-left bg-gray-100 p-2 rounded-md">
                                      <i className="mr-1 text-2xl text-green-600">
                                        {/* Cooking icon SVG */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                          />
                                        </svg>
                                      </i>
                                      <span className="text-sm">Parking</span>
                                    </li>
                                  )}
                                  
                                  {post.facilities.find(facility => facility === "Aircondition")&& (
                                    <li className="mr-3 mb-2 flex items-center text-left  bg-gray-100 p-2 rounded-md">
                                      <i className="mr-1 text-2xl text-green-600">
                                        {/* Cooking icon SVG */}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                          />
                                        </svg>
                                      </i>
                                      <span className="text-sm">Aircondition</span>
                                    </li>
                                  )}
                                  
                                </ul>

                                <ul className="m-0 flex list-none items-center justify-between px-0 pt-3 pb-0">
                                  <li className="text-left">
                                    <span className="text-sm text-gray-400">
                                      Mothly Price
                                    </span>
                                    <p className="m-0 text-base font-medium">
                                      LKR {post.price}/.
                                    </p>
                                  </li>

                                  {/* <li className="text-left">
                                    <span className="text-sm text-gray-400">
                                      Rating
                                    </span>
                                    <div className="mt-5 flex items-center"> */}
                {/* <div className="flex items-center">
                <StarRatings
                  rating={averageRating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="1px"
                />
                <span className="ml-1 mt-1 text-sm">({averageRating.toFixed(1)})</span>
                </div> */}
                
              
               
              
            
            
                {/* <p className="ml-4 mt-1 text-sm font-medium text-gray-500">
                  {totalComments} Reviews
                </p> */}
              {/* </div>
                                  </li> */}
                                  <li className="text-left">
                                  <Button
                style={{
                  backgroundColor: '#10b981', // Emerald 600
                  borderColor: '#10b981', // Emerald 600
                  color: '#ffffff',
                // White text
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669'; // Emerald 700
                  e.currentTarget.style.borderColor = '#059669'; // Emerald 700
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981'; // Emerald 600
                  e.currentTarget.style.borderColor = '#10b981'; // Emerald 600
                }}
                className="bg-emerald-500 border-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
              >
                Property Details
                
              </Button> 
                                  </li>
                                </ul>
                              </div>
                            </article>
                            </Link>
                          ))
                        )}
                      </div>
                    </section>
                  </TabPanel>
                )
              )}
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
              <TabPanel>
                <p>four!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
