// import "../styles/post.css";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button.tsx";
// import { Input } from "@/components/ui/input.tsx";
// import { Label } from "@/components/ui/label.tsx";
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
// } from "@/components/ui/select.tsx";
// import Map from "./Map.tsx";
// import { Textarea } from "@/components/ui/textarea.tsx";
// import "../styles/postform.css";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/Redux/store.ts";
// import { createPost } from "@/Redux/Post/PostAction.ts";
// import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
// import { app } from "../firebase.ts";

// export const facilities = [
//   "Aircondition",
//   "Wi-Fi",
//   "Gym",
//   "Cooking",
//   "Parking",
//   "Attached Bathroom",
//   "Tables",
//   "Television",
//   "Heater",
//   "Kitcken",
//   "Pantry",
//   "Water",
//   "Electricity",

// ];
// export const closeByLocation = [
//   "SLIIT",
//   "Horizon Campus",
//   "Univercity of Colombo",
//   "Univercity of Moratuwa",
// ];
// export const suitableFor = ["Boys", "Girls", "Both"];

// export function ListPost() {
//   const [location, setLocation] = useState(null);
//   const [postData, setPostData] = useState({
//     title: "",
//     location: "",
//     cityDistrict:"",
//     description: "",
//     price: "",
//     mobileContact: "",
//     emailContact:"",
//     whatsappContact:"",
//     availability: "available",
//     accommodationType: "",
//     closeByLocation: [],
//     suitableFor: [],
//     facilities: [],
//     images:[]
//   });
//   const dispatch = useDispatch<AppDispatch>();
//   const {} = useSelector((state: RootState) => state.Post);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(createPost(postData));
//   };

//   const handleLocationSelect = useCallback((place) => {
//     setLocation(place);
//     setPostData((prev) => ({ ...prev, location: place.label }));
//     console.log(place);
//   }, []);

//   const handleFacilitiesChange = (newValue) => {
//     const currentFacilities = postData.facilities;
//     const updatedFacilities = currentFacilities.includes(newValue)
//       ? currentFacilities.filter((facility) => facility !== newValue)
//       : [...currentFacilities, newValue];

//     setPostData((prev) => ({
//       ...prev,
//       facilities: updatedFacilities,
//     }));
//   };
//   const handleCloseByLocation = (newValue) => {
//     const currentCloseLocation = postData.closeByLocation;
//     const updatedCloseLocation = currentCloseLocation.includes(newValue)
//       ? currentCloseLocation.filter((facility) => facility !== newValue)
//       : [...currentCloseLocation, newValue];

//     setPostData((prev) => ({
//       ...prev,
//       closeByLocation: updatedCloseLocation,
//     }));
//   };

//   const handleSuitableFor = (newValue) => {
//     const currentSuitableFor = postData.suitableFor;
//     const updatedSuitableFor = currentSuitableFor.includes(newValue)
//       ? currentSuitableFor.filter((facility) => facility !== newValue)
//       : [...currentSuitableFor, newValue];

//     setPostData((prev) => ({
//       ...prev,
//       suitableFor: updatedSuitableFor,
//     }));
//   };
//   const handleSelectChange = (value: string) => {
//     setPostData((prevState) => ({
//       ...prevState,
//       availability: value,
//     }));
//   };
//   const handleDistrictChange = (value: string) => {
//     setPostData((prevState) => ({
//       ...prevState,
//       cityDistrict: value,
//     }));
//   };

//   //image upload
//   const [file, setFile] = useState<File | undefined>(undefined);
//   const fileRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (file) {
//       handleImageUpload(file);
//     }
//   }, [file]);

    
//   const handleImageUpload = (file: File) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, `images/${fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//             console.log(error);
//         },
//         async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             setPostData((prev) => ({
//                 ...prev,
//                 images: [...prev.images, downloadURL],
//             }));
//         }
//     );
// };

//   return (
//     <div className="w-full mt-8 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
//       <div className="flex items-center justify-center py-12">
//         <div className="mx-auto grid w-[350px] gap-6">
//           <div className="grid gap-2 text-center">
//             <h1 className="text-3xl font-bold">List Your Property</h1>
//             <p className="text-balance text-muted-foreground">
//               Enter your property below to get started.
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Title</Label>
//               <Input
//                 id="title"
//                 value={postData.title}
//                 onChange={(e) =>
//                   setPostData({ ...postData, title: e.target.value })
//                 }
//                 type="title"
//                 placeholder="Enter your property title"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Description</Label>
//               </div>
//               <Textarea
//                 value={postData.description}
//                 onChange={(e) =>
//                   setPostData({ ...postData, description: e.target.value })
//                 }
//                 placeholder="Enter your property description here."
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="facilities">Facilities</Label>
//               <div className={`flex flex-wrap gap-2 ${postData.facilities.length === 0 ? '' : 'mb-2'}`}>
//                 {postData.facilities.map((facility, index) => (
//                   <span
//                     key={index}
//                     className="bg-emerald-400 text-white px-2 py-1 rounded"
//                   >
//                     {facility}
//                   </span>
//                 ))}
//               </div>
//               <Select onValueChange={handleFacilitiesChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Facilities" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {facilities.map((facility) => (
//                     <SelectItem key={facility} value={facility}>
//                       {facility}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="location">Location</Label>
//               <GooglePlacesAutocomplete
//                 apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
//                 selectProps={{
//                   value: location,
//                   onChange: handleLocationSelect,
//                   placeholder: "Search for a location...",
//                   classNamePrefix: "custom-select",
//                   onError: (status, clearSuggestions) => {
//                     console.error("Error from Google Maps API", status);
//                     clearSuggestions();
//                   },
//                 }}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="avaliablility">Select District</Label>
//               <Select
//                 onValueChange={handleDistrictChange}
//                 defaultValue={postData.cityDistrict}
//               >
//                 <SelectTrigger >
//                   <SelectValue placeholder="Select District" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>District</SelectLabel>
//                     <SelectItem value="Colombo">Colombo</SelectItem>
//                     <SelectItem value="Kandy">Kandy</SelectItem>
//                     <SelectItem value="Jaffna">Jaffna</SelectItem>
//                     <SelectItem value="Rathnapura">
//                     Rathnapura
//                     </SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="closeByLocation">Close By Location</Label>
//               <div className={`flex flex-wrap gap-2 ${postData.closeByLocation.length === 0 ? '' : 'mb-2'}`}>
//                 {postData.closeByLocation.map((closeLocation, index) => (
//                   <span
//                     key={index}
//                     className="bg-emerald-400 text-white px-2 py-1 rounded"
//                   >
//                     {closeLocation}
//                   </span>
//                 ))}
//               </div>
//               <Select onValueChange={handleCloseByLocation}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select location close to" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {closeByLocation.map((closeLocation) => (
//                     <SelectItem key={closeLocation} value={closeLocation}>
//                       {closeLocation}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
           
//             <div className="grid gap-2">
//               <Label htmlFor="suitableFor">Suitable mostly for</Label>
//               <div className={`flex flex-wrap gap-2 ${postData.suitableFor.length === 0 ? '' : 'mb-2'}`}>
//                 {postData.suitableFor.map((suitableFor, index) => (
//                   <span
//                     key={index}
//                     className="bg-emerald-400 text-white px-2 py-1 rounded"
//                   >
//                     {suitableFor}
//                   </span>
//                 ))}
//               </div>
//               <Select onValueChange={handleSuitableFor}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select suitable for" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {suitableFor.map((suitableFor) => (
//                     <SelectItem key={suitableFor} value={suitableFor}>
//                       {suitableFor}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="avaliablility">Select the availability</Label>
//               <Select
//                 onValueChange={handleSelectChange}
//                 defaultValue={postData.availability}
//               >
//                 <SelectTrigger >
//                   <SelectValue placeholder={postData.availability} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Availability</SelectLabel>
//                     <SelectItem value="available">Available</SelectItem>
//                     <SelectItem value="not_available">Not Available</SelectItem>
//                     <SelectItem value="soon_available">
//                       Soon Available
//                     </SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <p className="text-muted-foreground font-semibold">
//               Enter Contact Information
//             </p>
//             <div className="grid gap-2">
//               <Label htmlFor="mobileNo">Mobile Number</Label>
//               <Input
//                 id="mobileno"
//                 value={postData.mobileContact}
//                 onChange={(e) =>
//                   setPostData({ ...postData, mobileContact: e.target.value })
//                 }
//                 type="mobileno"
//                 placeholder="Enter your mobile no"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="mobileNo">WhatsApp Number</Label>
//               <Input
//                 id="whatsappno"
//                 value={postData.whatsappContact}
//                 onChange={(e) =>
//                   setPostData({ ...postData, whatsappContact: e.target.value })
//                 }
//                 type="mobileno"
//                 placeholder="Enter your whatsApp no"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="mobileNo">Email Address</Label>
//               <Input
//                 id="emailno"
//                 value={postData.emailContact}
//                 onChange={(e) =>
//                   setPostData({ ...postData, emailContact: e.target.value })
//                 }
//                 type="emailno"
//                 placeholder="Enter your contact email"
//                 required
//               />
//             </div>
//             <p className="text-muted-foreground font-semibold">
//               Enter Price Information
//             </p>
//             <div className="grid gap-2">
//               <Label htmlFor="price">Monthly Price</Label>
//               <Input
//                 id="price"
//                 value={postData.price}
//                 onChange={(e) =>
//                   setPostData({ ...postData, price: e.target.value })
//                 }
//                 type="mobileno"
//                 placeholder="Enter monthly price"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="images">Images</Label>
//               <input
//     type="file"
//     ref={fileRef}
//     onChange={(e) => {
//         if (e.target.files) {
//             Array.from(e.target.files).forEach(file => handleImageUpload(file));
//         }
//     }}
//     accept="image/*"
//     multiple
// />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {postData.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`uploaded-${index}`}
//                     className="w-20 h-20 object-cover"
//                   />
//                 ))}
//               </div>
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-emerald-500 hover:bg-emerald-600"
//             >
//               List My Place
//             </Button>
//           </form>
//         </div>
//       </div>

//       <div className="lg:block hidden h-full">
//         <div className="fixed-image">
//           <Map location={location} />
//         </div>
//       </div>
//     </div>
//   );
// }
