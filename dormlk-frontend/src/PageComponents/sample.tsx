// import "../styles/post.css";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState, useCallback, useRef, useEffect } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Map from "./Map"; // Ensure this component is properly implemented
// import { Textarea } from "@/components/ui/textarea";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/Redux/store";
// import { createPost } from "@/Redux/Post/PostAction";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { app } from "../firebase";
// import {
//   Step,
//   StepIndicator,
//   StepStatus,
//   StepSeparator,
//   StepTitle,
//   StepDescription,
//   Stepper,
// } from "@chakra-ui/react";

// export const facilities = [
//   "Aircondition",
//   "Wi-Fi",
//   "Gym",
//   // Add more facilities as needed
// ];

// export default function ListPostSteper() {
//   const [location, setLocation] = useState(null);
//   const [postData, setPostData] = useState({
//     title: "",
//     location: "",
//     description: "",
//     price: "",
//     mobileContact: "",
//     emailContact: "",
//     whatsappContact: "",
//     availability: "available",
//     closeByLocation: [],
//     suitableFor: [],
//     facilities: [],
//     images: [],
//   });
//   const [currentStep, setCurrentStep] = useState(0);
//   const dispatch = useDispatch<AppDispatch>();
//   const { } = useSelector((state: RootState) => state.Post);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createPost(postData));
//   };

//   const handleLocationSelect = useCallback((place) => {
//     setLocation(place);
//     setPostData((prev) => ({ ...prev, location: place.label }));
//   }, []);

//   const handleFacilitiesChange = (newValue) => {
//     const updatedFacilities = postData.facilities.includes(newValue)
//       ? postData.facilities.filter((facility) => facility !== newValue)
//       : [...postData.facilities, newValue];

//     setPostData((prev) => ({
//       ...prev,
//       facilities: updatedFacilities,
//     }));
//   };

//   const handleImageUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, `images/${fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on('state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(`Upload is ${progress}% done`);
//       },
//       (error) => {
//         console.log(error);
//       },
//       async () => {
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//         setPostData((prev) => ({
//           ...prev,
//           images: [...prev.images, downloadURL],
//         }));
//       }
//     );
//   };

//   return (
//     <div className="w-full mt-8 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">List Your Property</h1>
//       <Stepper activeStep={currentStep} colorScheme="teal">
//         <Step>
//           <StepIndicator />
//           <StepTitle>Property Details</StepTitle>
          
//         </Step>
//         <Step>
//           <StepIndicator />
//           <StepTitle>Facilities</StepTitle>
          
//         </Step>
//         <Step>
//           <StepIndicator />
//           <StepTitle>Contact Information</StepTitle>
         
//         </Step>
//       </Stepper>

//       <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
//         {currentStep === 0 && (
//           <>
//             <div>
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 value={postData.title}
//                 onChange={(e) =>
//                   setPostData({ ...postData, title: e.target.value })
//                 }
//                 placeholder="Enter your property title"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={postData.description}
//                 onChange={(e) =>
//                   setPostData({ ...postData, description: e.target.value })
//                 }
//                 placeholder="Enter your property description"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <Button onClick={() => setCurrentStep(1)}>Next</Button>
//             </div>
//           </>
//         )}

//         {currentStep === 1 && (
//           <>
//             <Label htmlFor="facilities">Facilities</Label>
//             <Select onValueChange={handleFacilitiesChange}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Facilities" />
//               </SelectTrigger>
//               <SelectContent>
//                 {facilities.map((facility) => (
//                   <SelectItem key={facility} value={facility}>
//                     {facility}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <div className="flex justify-between mt-4">
//               <Button onClick={() => setCurrentStep(0)}>Back</Button>
//               <Button onClick={() => setCurrentStep(2)}>Next</Button>
//             </div>
//           </>
//         )}

//         {currentStep === 2 && (
//           <>
//             <div>
//               <Label htmlFor="mobileContact">Mobile Number</Label>
//               <Input
//                 id="mobileContact"
//                 value={postData.mobileContact}
//                 onChange={(e) =>
//                   setPostData({ ...postData, mobileContact: e.target.value })
//                 }
//                 placeholder="Enter your mobile number"
//                 required
//               />
//             </div>
//             <div className="flex justify-between mt-4">
//               <Button onClick={() => setCurrentStep(1)}>Back</Button>
//               <Button type="submit">List My Place</Button>
//             </div>
//           </>
//         )}
//       </form>

//       <div className="lg:block hidden h-full mt-6">
//         {location && <Map location={location} />}
//       </div>
//     </div>
//   );
// }











