import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import list from "../assets/list.json";
import Cards from "./Cards";
import { Link } from "react-router-dom"

const Course = () => {
  // console.log(list);
  return (
    <>
      <div className="h-screen w-full overflow-hidden  max-w-screen-2xl mx-auto md:px-20 px-4 overflow-y-auto ">
        <div className=" flex  justify-center items-center mt-20">
          <p className="text-center text-xl mt-2 text-fuchsia-600">
            We're delighted to have you here :)
          </p>
          <h1 className="text-center font-semibold text-black text-3xl ml-2">
            bookStore
          </h1>  
        </div>

        <div className=" mt-6">
            
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              sint sunt deleniti dolore! Ea, amet maiores aliquid ad suscipit
              esse. At tenetur excepturi quam. Qui natus eveniet ipsam iste!
              Voluptate vero sint libero eum minus explicabo culpa harum,
              dolorum aperiam quia ipsa. Libero nobis minima maiores est vel
              soluta. Nostrum.
            </p>

            <div>

              <div className="w-full flex justify-center">

                <Link to="/home">
                <button className="px-4 py-2 rounded-md bg-fuchsia-500 text-white mt-5  hover:bg-fuchsia-900 duration-500  "> Back</button>

                </Link>

              </div>

            </div>

            <div className="flex justify-center">
              <div className="  w-full flex justify-center flex-wrap gap-5">
                {
                  list.map((item)=>(
                    <div className="mt-6">
                        <Cards key={item.id} item={item} />
                    </div>
                    
                  ))
                  
                }
              </div>
            </div>


          </div>


       


        
      </div>
    </>
  );
};

export default Course;
