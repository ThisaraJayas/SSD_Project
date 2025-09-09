import ChakraCarousel from '@/PageComponents/ChakraCarousel.tsx';
import { fetchPostsByPostId } from '@/Redux/Post/PostAction.ts';
import { AppDispatch, RootState } from '@/Redux/store.ts';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ViewAdminPostData() {
  const dispatch = useDispatch<AppDispatch>();
  const { itemPost } = useSelector((state: RootState) => state.Post);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [messageText, setMessageText] = useState('');

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");

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
    <div><section className="py-12 mt-6 sm:py-16">
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
            <h1 className="sm: text-4xl font-bold text-gray-900 sm:text-4xl">
                {itemPost.title}
              </h1>
              <h1 className="sm: text-1xl text-gray-600 sm:text-1xl">
                {itemPost.location}
              </h1>
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
              <h1 className="text-3xl font-bold">{itemPost.price}</h1>
                  <span className="text-base">/month</span>
                  <div>
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
            </section>
    </div>
  )
}
