import "../styles/post.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import React, { useState, useCallback, useRef, useEffect } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Progress } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogCloseButton } from "@chakra-ui/react";
import Map from "./Map.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import "../styles/postform.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { createPost } from "@/Redux/Post/PostAction.ts";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.ts";
import {
  Step,
  StepIndicator,
  StepStatus,
  StepSeparator,
  StepTitle,
  StepDescription,
  Stepper,
} from "@chakra-ui/react";
import image from '../styles/home2.jpg'

const MAX_IMAGES = 8;
export const facilities = [
  "Aircondition",
  "Wi-Fi",
  "Gym",
  "Cooking",
  "Parking",
  "Attached Bathroom",
  "Furniture",
  "Television",
  "Heater",
  "Kitcken",
  "Pantry",
  "Water",
  "Electricity",
];

export const closeByLocation = [
  "SLIIT",
  "Horizon Campus",
  "NSBM",
  "University of Moratuwa",
  "Open University",
  "University of Colombo",
  "Eastern University",
  "University of Jaffna",
  "University of Kelaniya",
  "University of Peradeniya",
  "Rajarata University",
  "Uva Wellassa University",
  "University of Sri Jayewardenepura",
  "South Eastern University",
  "Sabaragamuwa University",
  "University of Ruhuna",
];
export const suitableFor = ["Girls", "Boys"];

export default function ListPostSteper() {
  const [location, setLocation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(13)
  const [postData, setPostData] = useState({
    title: "",
    location: "",
    cityDistrict: "",
    description: "",
    price: "",
    mobileContact: "",
    emailContact: "",
    whatsappContact: "",
    availability: "available",
    accommodationType: "",
    closeByLocation: [],
    suitableFor: [],
    facilities: [],
    images: [],
    noOfBed:"",
    noOfBathroom:""
  });
  const dispatch = useDispatch<AppDispatch>();
  const {status} = useSelector((state: RootState) => state.Post);
  const {loginUser, status: userStatus} =useSelector((state:RootState)=>state.User)
    const navigate = useNavigate()
    useEffect(() => {
      if (userStatus === 'failed' && !loginUser) {
        navigate('/login');
      }
    }, [status, loginUser, navigate]);

  const [titleCount, setTitleCount] = useState(70);
  const [descriptionCount, setDescriptionCount] = useState(5000);

  const [showAlert, setShowAlert] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status) {
      
      if (status === "succeeded") {
        setDialogTitle("Success ✔️");
        setDialogMessage("Post submitted for review successfully!");
      } else if (status === "failed") {
        setDialogTitle("Failed ❌");
        setDialogMessage("Post submission failed. Please try again.");
      } else if (status === "loading") {
        setDialogTitle("Loading..");
        setDialogMessage("Submitting your post...");
      }
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Format the price before sending to the database
    const formattedPrice = formatPrice(postData.price);
    const dataToSubmit = { ...postData, price: formattedPrice };
    dispatch(createPost(dataToSubmit));
    setIsDialogOpen(true);
  };

  const formatPrice = (price: string) => {
    // Remove any non-numeric characters
    const numericPrice = price.replace(/[^0-9]/g, "");
    // Add commas as thousand separators
    return numericPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleLocationSelect = useCallback((place) => {
    setLocation(place);
    setPostData((prev) => ({ ...prev, location: place.label }));
    console.log(place);
  }, []);

  const handleFacilitiesChange = (newValue) => {
    const currentFacilities = postData.facilities;
    const updatedFacilities = currentFacilities.includes(newValue)
      ? currentFacilities.filter((facility) => facility !== newValue)
      : [...currentFacilities, newValue];

    setPostData((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));
  };
  const handleCloseByLocation = (newValue) => {
    const currentCloseLocation = postData.closeByLocation;
    const updatedCloseLocation = currentCloseLocation.includes(newValue)
      ? currentCloseLocation.filter((facility) => facility !== newValue)
      : [...currentCloseLocation, newValue];

    setPostData((prev) => ({
      ...prev,
      closeByLocation: updatedCloseLocation,
    }));
  };

  const handleSuitableFor = (newValue) => {
    const currentSuitableFor = postData.suitableFor;
    const updatedSuitableFor = currentSuitableFor.includes(newValue)
      ? currentSuitableFor.filter((facility) => facility !== newValue)
      : [...currentSuitableFor, newValue];

    setPostData((prev) => ({
      ...prev,
      suitableFor: updatedSuitableFor,
    }));
  };
  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, []);
  const handleSelectChange = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      availability: value,
    }));
  };
  const handleNoOfBedChange = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      noOfBed: value,
    }));
  };
  const handleAccomodationTypeChange = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      accommodationType: value,
    }));
  };
  

  const handleNoOfBathRoomChange = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      noOfBathroom: value,
    }));
  };
  const handleDistrictChange = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      cityDistrict: value,
    }));
  };

  //image upload
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      handleImageUpload(file);
    }
  }, [file]);

  const handleImageUpload = (file: File) => {
    if (postData.images.length >= MAX_IMAGES) {
      setShowAlert(true);
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setPostData((prev) => ({
          ...prev,
          images: [...prev.images, downloadURL],
        }));
      }
    );
  };
   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (postData.images.length + selectedFiles.length > MAX_IMAGES) {
        setShowAlert(true);
        return;
      }

      selectedFiles.forEach((file) => {
        setFile(file);
      });
    }
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update the price in the state
    setPostData((prev) => ({ ...prev, price: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPostData((prev) => ({ ...prev, title: newTitle }));
    setTitleCount(70 - newTitle.length);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setPostData((prev) => ({ ...prev, description: newDescription }));
    setDescriptionCount(5000 - newDescription.length);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setPostData((prev) => ({ ...prev, location: location }));
    
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
  const value = e.target.value;

  // Allow only numeric input
  if (/^\d*$/.test(value)) {
    if (type === "mobile") {
      setPostData((prev) => ({ ...prev, mobileContact: value }));
    } else if (type === "whatsapp") {
      setPostData((prev) => ({ ...prev, whatsappContact: value }));
    }
  } else {
    // Show alert if non-numeric input is entered
    setShowAlert(true);
  }
};
  return (
    <div className="w-full mt-8 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[200px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-2">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">List Your Property</h1>
            {/* <p className="text-balance text-muted-foreground">
              Enter your property below to get started.
            </p> */}
          </div>
          <Stepper index={currentStep} colorScheme="teal">
            <Step>
              {/* <StepIndicator />
          <StepTitle>Property Details</StepTitle> */}
            </Step>

            <Step>
              {/* <StepIndicator />
          <StepTitle>Facilities</StepTitle> */}
            </Step>

            <Step>
              {/* <StepIndicator />
          <StepTitle>Contact Information</StepTitle> */}
            </Step>
          </Stepper>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {currentStep === 0 && (
              <>
                <div className="text-center">
                  <h1 className="text-2xl mb-0 font-semibold bg-gray-100 p-2 rounded-full">
                    1/5 Property Details
                  </h1>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Title</Label>
                  <Input
                    id="title"
                    value={postData.title}
                    onChange={handleTitleChange}
                    type="title"
                    placeholder="Enter your property title"
                    maxLength={70}
                    required
                  />
                   <p className="text-sm text-gray-500">
                    {titleCount} characters remaining
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Description</Label>
                  </div>
                  <Textarea
                    value={postData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter your property description here."
                    maxLength={5000}
                  />
                   <p className="text-sm text-gray-500">
                    {descriptionCount} characters remaining
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  {/* <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    selectProps={{
                      value: location,
                      onChange: handleLocationSelect,
                      placeholder: "Search for a location...",
                      classNamePrefix: "custom-select",
                      onError: (status, clearSuggestions) => {
                        console.error("Error from Google Maps API", status);
                        clearSuggestions();
                      },
                    }}
                  /> */}
                  <Input
                    id="title"
                    value={postData.location}
                    onChange={handleAddressChange}
                    type="title"
                    placeholder="Enter your Address"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avaliablility">Select District</Label>
                  <Select
                    onValueChange={handleDistrictChange}
                    defaultValue={postData.cityDistrict}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>District</SelectLabel>
                        <SelectItem value="Colombo">Colombo</SelectItem>
                        <SelectItem value="Kandy">Kandy</SelectItem>
                        <SelectItem value="Jaffna">Jaffna</SelectItem>
                        <SelectItem value="Rathnapura">Rathnapura</SelectItem>
                        <SelectItem value="Gampaha">Gampaha</SelectItem>
                        <SelectItem value="Galle">Galle</SelectItem>
                        <SelectItem value="Ratnapura">Ratnapura</SelectItem>
                        <SelectItem value="Nuwara Eliya">Nuwara Eliya</SelectItem>
                        <SelectItem value="Ampara">Ampara</SelectItem>
                        <SelectItem value="Anuradhapura">Anuradhapura</SelectItem>
                        <SelectItem value="Badulla">Badulla</SelectItem>
                        <SelectItem value="Batticaloa">Batticaloa</SelectItem>
                        <SelectItem value="Hambantota">Hambantota</SelectItem>
                        <SelectItem value="Kalutara">Kalutara</SelectItem>
                        <SelectItem value="Kegalle">Kegalle</SelectItem>
                        <SelectItem value="Kilinochchi">Kilinochchi</SelectItem>
                        <SelectItem value="Kurunegala">Kurunegala</SelectItem>
                        <SelectItem value="Mannar">Mannar</SelectItem>
                        <SelectItem value="Matale">Matale</SelectItem>
                        <SelectItem value="Monaragala">Monaragala</SelectItem>
                        <SelectItem value="Mullaitivu">Mullaitivu</SelectItem>
                        <SelectItem value="Polonnaruwa">Polonnaruwa</SelectItem>
                        <SelectItem value="Puttalam">Puttalam</SelectItem>
                        <SelectItem value="Trincomalee">Trincomalee</SelectItem>
                        <SelectItem value="Vavuniya">Vavuniya</SelectItem>

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="closeByLocation">Close By Location</Label>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      postData.closeByLocation.length === 0 ? "" : "mb-2"
                    }`}
                  >
                    {postData.closeByLocation.map((closeLocation, index) => (
                      <span
                        key={index}
                        className="bg-emerald-400 text-white px-2 py-1 rounded"
                      >
                        {closeLocation}
                      </span>
                    ))}
                  </div>
                  <Select onValueChange={handleCloseByLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location close to" />
                    </SelectTrigger>
                    <SelectContent>
                      {closeByLocation.map((closeLocation) => (
                        <SelectItem key={closeLocation} value={closeLocation}>
                          {closeLocation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {currentStep === 1 && (
              <>
                <div className="text-center">
                  <h1 className="text-2xl mb-0 font-semibold bg-gray-100 p-2 rounded-full">
                    2/5 Facilities
                  </h1>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="facilities">Facilities</Label>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      postData.facilities.length === 0 ? "" : "mb-2"
                    }`}
                  >
                    {postData.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-emerald-400 text-white px-2 py-1 rounded"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                  <Select onValueChange={handleFacilitiesChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Facilities" />
                    </SelectTrigger>
                    <SelectContent>
                      {facilities.map((facility) => (
                        <SelectItem key={facility} value={facility}>
                          {facility}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="suitableFor">Suitable mostly for</Label>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      postData.suitableFor.length === 0 ? "" : "mb-2"
                    }`}
                  >
                    {postData.suitableFor.map((suitableFor, index) => (
                      <span
                        key={index}
                        className="bg-emerald-400 text-white px-2 py-1 rounded"
                      >
                        {suitableFor}
                      </span>
                    ))}
                  </div>
                  <Select onValueChange={handleSuitableFor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select suitable for" />
                    </SelectTrigger>
                    <SelectContent>
                      {suitableFor.map((suitableFor) => (
                        <SelectItem key={suitableFor} value={suitableFor}>
                          {suitableFor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="noOfBed">No of Beds</Label>
                  <Select
                    onValueChange={handleNoOfBedChange}
                    
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select no of beds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>No of Beds</SelectLabel>
                        <SelectItem value="1">One</SelectItem>
                        <SelectItem value="2">
                          Two
                        </SelectItem>
                        <SelectItem value="3">
                          Three
                        </SelectItem>
                        <SelectItem value="4">
                          Four
                        </SelectItem>
                        <SelectItem value="5+">
                          Five+
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="noOfbathroom">No of Bathrooms</Label>
                  <Select
                    onValueChange={handleNoOfBathRoomChange}
                    
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select no of bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>No of Bathrooms</SelectLabel>
                        <SelectItem value="1">One</SelectItem>
                        <SelectItem value="2">
                          Two
                        </SelectItem>
                        <SelectItem value="3">
                          Three
                        </SelectItem>
                        <SelectItem value="4">
                          Four
                        </SelectItem>
                        <SelectItem value="5+">
                          Five+
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="accomodationType">Select Accommodation Type</Label>
                  <Select
                    onValueChange={handleAccomodationTypeChange}
                    
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Accommodation Type</SelectLabel>
                        <SelectItem value="Single Room">Single Room</SelectItem>
                        <SelectItem value="Double Room">
                        Double Room
                        </SelectItem>
                        <SelectItem value="Apartment">
                        Apartment
                        </SelectItem>
                        <SelectItem value="Studio Apartment">
                        Studio Apartment
                        </SelectItem>
                        <SelectItem value="Hostel">
                        Hostel
                        </SelectItem>
                        <SelectItem value="Shared Room">
                        Shared Room
                        </SelectItem>
                        <SelectItem value="Annex">
                        Annex
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(2)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="text-center">
                  <h1 className="text-2xl mb-0 font-semibold bg-gray-100 p-2 rounded-full">
                    3/5 Price Details
                  </h1>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Monthly Price</Label>
                  <Input
                    id="price"
                    value={postData.price}
                    onChange={handlePriceChange}
                    type="mobileno"
                    maxLength={7}
                    placeholder="Enter monthly price"
                    required
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(3)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div className="text-center">
                  <h1 className="text-2xl mb-0 font-semibold bg-gray-100 p-2 rounded-full">
                    4/5 Additional Details
                  </h1>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  {showAlert && (
        <Alert status="warning" variant="subtle">
          <AlertIcon />
          <AlertTitle>Upload Limit Reached</AlertTitle>
          <AlertDescription>
            You can upload a maximum of {MAX_IMAGES} images.
          </AlertDescription>
        </Alert>
      )}
                  <Label htmlFor="images">Images</Label>
                  <Input
                    type="file"
                    ref={fileRef}
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach((file) =>
                          handleImageUpload(file)
                        );
                      }
                    }}
                    
                    accept="image/*"
                    multiple
                  />
                  
                  <div>
                  <Progress value={progress} colorScheme="green" className="w-full" />
                    </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    
                    {postData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`uploaded-${index}`}
                        className="w-20 h-20 object-cover"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avaliablility">Select the availability</Label>
                  <Select
                    onValueChange={handleSelectChange}
                    defaultValue={postData.availability}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={postData.availability} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Availability</SelectLabel>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not_available">
                          Not Available
                        </SelectItem>
                        <SelectItem value="soon_available">
                          Soon Available
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(4)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <div className="text-center">
                  <h1 className="text-2xl mb-0 font-semibold bg-gray-100 p-2 rounded-full">
                    5/5 Contact Details
                  </h1>
                </div>
                {/* {showAlert && (
      <Alert status="error" onClose={() => setShowAlert(false)}>
        <AlertIcon />
        <AlertTitle>Invalid Input!</AlertTitle>
        <AlertDescription>Only numbers are allowed for contact numbers.</AlertDescription>
      </Alert>
    )} */}
                <div className="grid gap-2">
                  <Label htmlFor="mobileNo">Mobile Number</Label>
                  <Input
                    id="mobileno"
                    value={postData.mobileContact}
        onChange={(e) => handleContactChange(e, "mobile")}
                    type="mobileno"
                    placeholder="Enter your mobile no"
                    maxLength={12}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobileNo">WhatsApp Number</Label>
                  <Input
                    id="whatsappno"
                    value={postData.whatsappContact}
        onChange={(e) => handleContactChange(e, "whatsapp")}
                    type="mobileno"
                    maxLength={12}
                    placeholder="Enter your whatsApp no"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobileNo">Email Address</Label>
                  <Input
                    id="emailno"
                    type='email'
                    value={postData.emailContact}
                    onChange={(e) =>
                      setPostData({ ...postData, emailContact: e.target.value })
                    }
                    
                    placeholder="Enter your contact email"
                    required
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setCurrentStep(3)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className=" bg-emerald-500 hover:bg-emerald-600"
                  >
                    List My Place
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
          {/* Dialog */}
          <AlertDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} leastDestructiveRef={cancelRef}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>{dialogTitle}</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>{dialogMessage}</AlertDialogBody>
              <AlertDialogFooter>
                <Button style={{
   backgroundColor: '#01aa7a',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  }} ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>

      <div className="lg:block hidden h-full">
        <div className="fixed-image">
          {/* <Map location={location} /> */}
          <img src={image} alt="Description of image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
  //   lg:block hidden h-full
}
