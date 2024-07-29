import React from "react";
import { Link, useNavigate,Navigate } from "react-router-dom";
import CloseButton from "./CloseButton";
import { useForm } from "react-hook-form";
import axios from "axios"; // Make sure axios is imported

import { useToast } from "@chakra-ui/react"; // Import useToast
import { Button, Wrap, WrapItem } from "@chakra-ui/react"
import Login from "./Login";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();
  const toast = useToast();

  const handleLoginRedirect=()=>{
    Navigate('/home');

  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        data
      );
      console.log('Response Data',response.data);
      toast({
        title: "User registered successfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
      Navigate("/home");

      // Handle successful registration (e.g., navigate to login or show a success message)
    } catch (error) {
      console.error("There was an error registering the user!", error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        toast({
          title: error.response.data.error || "Registration failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });       
      } else {
        console.error("Unexpected error:", error.message);
        toast({
          title: error.response.data.error || "Registration failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });      
      }
    }
  };


  return (
    <div className="w-full h-screen bg-[f5f5f5] flex justify-center items-center bg-[#f5f5f5]">
      <div>
        <div className="shadow-2xl rounded-lg p-24">
          <div>
            <CloseButton onClick={() => console.log("Close button clicked")} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center items-center"
            >
              <div>
                <div className="form-div space-y-8 mb-5">
                  <h1 className="font-bold text-2xl text-black">Sign-Up</h1>
                  <label className="input input-bordered flex items-center gap-2 w-80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-700">
                        This field is required
                      </span>
                    )}
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Username"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <span className="text-red-700">
                        This field is required
                      </span>
                    )}
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      autoComplete="false"
                      className="grow"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-700">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
                <button className="bg-red-600 px-3 py-3 rounded-lg hover:btn glass">Submit</button>
                <div className="flex justify-center items-center">
                  <p className="mt-4 text-black">
                    Have Account
                    <span className="text-blue-600 ml-2">
                      <Link
                     
                        to="/home"
                        className="hover:shadow-2xl transition-transform duration-300 ease-in-out"
                      >
                        <button onClick={handleLoginRedirect}>
                          login 
                        </button>
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
