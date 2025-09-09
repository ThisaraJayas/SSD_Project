import React, { useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Flex, Image, Box, Spinner, Button } from '@chakra-ui/react'
import anexImg from '../assets/homeIcons/real-estate.png'
import sharedImg from '../assets/homeIcons/roommate.png'
import aprtmnetImg from '../assets/homeIcons/apartment.png'
import dblRoomImg from '../assets/homeIcons/room-mate.png'
import houseImg from '../assets/homeIcons/home(2).png'
import studioImg from '../assets/homeIcons/home-office.png'
import hostelImg from '../assets/homeIcons/hostel.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Redux/store.ts'
import { fetchPostByHouseType } from '@/Redux/Post/PostAction.ts'
import { TfiLocationPin } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

type Facility = 'Parking' | 'Wi-Fi' | 'Pool' | 'Gym';
interface Post {
  _id: string;
  title: string;
  images: string[];
  cityDistrict: string;
  accommodationType?: string;
  noOfBed?: number;
  noOfBathroom?: number;
  facilities: Facility[];
  postStatus: string;
}
const post: Post = {
  _id: '',
  title: '',
  images: [],
  cityDistrict: '',
  facilities: [],
  postStatus: ''
}

export default function HomeHeaderTabs() {
    const dispatch = useDispatch<AppDispatch>();
  const { allPostByHouseType, status } = useSelector((state: RootState) => state.Post);
  const handleTabChange = (HouseType) => {
    console.log(HouseType);
    dispatch(fetchPostByHouseType(HouseType));
  };

  useEffect(() => {
    console.log('Current status:', status);
    console.log('Posts by house type:', allPostByHouseType);
  }, [status, allPostByHouseType]);
  
  useEffect(() => {
    handleTabChange("Annex");
  }, [dispatch]);

  return (
    <Box style={{ margin: '0 20px', marginTop:'3%' }}>
      <Tabs position='relative' variant='unstyled' onChange={(index) => {
              const HouseType = ["Annex", "Shared Room", "Apartment", "Double Room","House","Studio Apartment","Hostel"];
              handleTabChange(HouseType[index]);
            }}>
        <Flex justifyContent='center'>
          <Box overflowX='auto' width='100%'>
            <TabList display='flex' justifyContent='center'>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={anexImg} alt='Icon One' boxSize='64px' mb={1} />
                  <span>Annex</span>
                </Flex>
              </Tab>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={sharedImg} alt='Icon Two' boxSize='64px' mb={1} />
                  <span>Shared</span>
                </Flex>
              </Tab>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={aprtmnetImg} alt='Icon Three' boxSize='64px' mb={1} />
                  <span>Appartment</span>
                </Flex>
              </Tab>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={dblRoomImg} alt='Icon Four' boxSize='64px' mb={1} />
                  <span>Double</span>
                </Flex>
              </Tab>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={houseImg} alt='Icon Five' boxSize='64px' mb={1} />
                  <span>House</span>
                </Flex>
              </Tab>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={studioImg} alt='Icon Six' boxSize='64px' mb={1} />
                  <span>Studio</span>
                </Flex>
              </Tab>
              <Tab minWidth='120px' px={4}>
                <Flex direction='column' align='center'>
                  <Image src={hostelImg} alt='Icon Seven' boxSize='64px' mb={1} />
                  <span>Hostel</span>
                </Flex>
              </Tab>
            </TabList>
          </Box>
        </Flex>
        <TabIndicator mt='-1.5px' height='2px' bg='green.100' borderRadius='1px' />
        <TabPanels>
        {["Annex", "Shared Room", "Apartment", "Double Room","House","Studio Apartment","Hostel"].map(
                (houseType, index) => (
                  <TabPanel key={index}  ml={{ base: '3%', md: '3%' }} mr={{ base: '3%', md: '3%' }}>
                    <section className="flex flex-col items-center bg-white" >
                      <div  className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">
                        {status === "loading" ? (
                          <div className="flex justify-center">
                            <Spinner size="lg" />
                          </div>
                        ) : (
                          allPostByHouseType?.filter(post => post.postStatus === "ACCEPTED").slice(0,6).map((post) => (
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
                                  { post.facilities.find(facility => facility === "Wi-Fi") !== undefined && (
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
                                  
                                  {post.facilities.find(facility => facility === "Aircondition") && (
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
                className="bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
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
        </TabPanels>
      </Tabs>
    </Box>
  )
}
