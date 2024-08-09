import React, { useState, useRef } from "react";
import { BsPencil } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Avatar,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { Toast, useToast } from "@chakra-ui/react";

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  );

  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const toast = useToast();


  const [isHover, setIsHovered] = useState(false);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/profiles", data, {
      headers: {
        "Content-Type": "application/json", // Specify that you are sending JSON data
      },
    });
    toast({
        title: "User registered successfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
      console.log("Data saved successfully", response.data);
      
    } catch (error) {
        toast({
            title: error.response.data.error || "Registration failed!",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
      console.error("Error creating profile", error);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setValue(id, value); // Use setValue from useForm to update the state
  };

  return (
    <>
    <div className="container">
        <main className="w-full min-h-screen py-1">
            <div className="content">
                <div className="mt-8 sm:rounded-lg">
                    <h2 className="pl-6 text-3xl text-center font-bold sm:text-xl">Public Profile</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex gap-40 mt-8">
                            <div className="flex flex-col items-center space-y-5">
                                <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500" src={typeof profilePic === "string" ? profilePic : URL.createObjectURL(profilePic)} alt="Bordered avatar" />
                                    {isHover && (
                                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full">
                                            <BsPencil className="text-white cursor-pointer" onClick={() => document.getElementById("fileInput").click()} />
                                        </div>
                                    )}

                                    <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleUpload} ref={fileInputRef} />
                                </div>

                                <button type="button" className="py-3 px-2 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200">Change picture</button>
                                <button type="button" className="px-2 py-3 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200">Delete picture</button>

                                <div className="card bg-red-500">
                                    <Card width="300px" height="500px">
                                        <CardHeader>
                                            <Flex spacing="4">
                                                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                                                    <Avatar name={`${profilePic.name}`} src={typeof profilePic === "string" ? profilePic : URL.createObjectURL(profilePic)} />
                                                    <Box>
                                                        <Heading size="sm">Segun Adebayo</Heading>
                                                        <Text>Creator, Chakra UI</Text>
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>
                                                With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen.
                                            </Text>
                                        </CardBody>
                                        <Image objectFit="cover" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Chakra UI" />

                                        <CardFooter justify="space-between" flexWrap="wrap" sx={{ "& > button": { minW: "136px" } }}>
                                            <button flex="1" variant="ghost" leftIcon={<BsPencil />}>
                                                Like
                                            </button>
                                            <button flex="1" variant="ghost" leftIcon={<BsPencil />}>
                                                Comment
                                            </button>
                                            <button flex="1" variant="ghost" leftIcon={<BsPencil />}>
                                                Share
                                            </button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>

                            <div className="mt-20 flex flex-col space-y-4 text-[#202142] w-full lg:w-3/5 xl:w-1/2">
                                <div className="w-full">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your first name</label>
                                    <input type="text" id="first_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Your first name" {...register("first_name", { required: true })} />
                                    {errors.first_name && <span className="text-red-500 text-sm">First name is required</span>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your last name</label>
                                    <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Your last name" {...register("last_name", { required: true })} />
                                    {errors.last_name && <span className="text-red-500 text-sm">Last name is required</span>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your email</label>
                                    <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="your.email@mail.com" {...register("email", { required: true })} />
                                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Profession</label>
                                    <input type="text" id="profession" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="your profession" {...register("profession", { required: true })} />
                                    {errors.profession && <span className="text-red-500 text-sm">Profession is required</span>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="bio" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                    <textarea id="bio" rows="4" className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Write your bio here..." {...register("bio", { required: true })}></textarea>
                                    {errors.bio && <span className="text-red-500 text-sm">Bio is required</span>}
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</>
  );
};

export default ProfilePage;
