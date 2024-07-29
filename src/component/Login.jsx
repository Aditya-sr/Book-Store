import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { Toast, useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";



const Login = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);

  const closeModal = () => setIsModalOpen(false);
  const toast = useToast();


  const onSubmit = async (data) =>{
    try{
      const response=await axios.post('http://localhost:5000/auth/login',data)
      console.log("API Response:", response);
      const { token } = response.data;
      login(token);
      if (!token) {
        throw new Error("Token not found in response");
      }
      Cookies.set('uid',token,{expires:7});
      console.log("Login successful, token",token);

      closeModal();
      console.log(data);

      
    }catch(error){
      console.error("Login failed", error.response?.data?.error || error.message);
      toast({
        title:"Login Failed",
        description: error.response?.data?.error || error.message,
        status:"error",
        isClosable:true,

      });

    }

  } 
  return (
    <>
      <dialog id="my_modal_1" className="modal" open={isModalOpen}>
        <div className="modal-box bg-[#f5f5f5]  ">
          <div className="modal-action">
               {/* Close button added here */}
               <button onClick={closeModal} className="absolute top-3 right-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog flex justify-center items-center"
            >
              <div className="form-div space-y-8 mr-24 mb-5  ">
                <h1 className="font-bold text-xl text-black ">Login</h1>

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
                    <span className="text-red-700" >This field is required 
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
                    <span className="text-red-700">This field is required
                     <br />
                     </span>
                    
                  )}
                </label>
              </div>

              <button className="  bg-red-600 hover: btn glass">
                Submit
              </button>

              <p className="mt-4 ml-44 text-black">
                Not Registered?
                <span className="text-blue-600 ml-2">
                  <Link
                    to="/sign-up"
                    className="hover:shadow-2xl transition-transform duration-300 ease-in-out"
                  >
                    Sign-Up
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Login;
