import React from "react";
import list from "../assets/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";

const Freebook = () => {
  const filterData = list.filter((data) => data.price === "free");

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  // console.log(filterData);

  return (
    <>
      <div className="max-screen-2xl overflow-hidden mx-auto md:px-20 px-4 my-10">
       
       <div className="para">

       <h1 className="text-4xl text-center font-semibold text-black mb-8">
          Free Books
        </h1>
       <p className="mb-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
          cupiditate at, omnis ab facilis, atque eaque aperiam dolore iste
          perspiciatis, assumenda dicta veritatis. In dolorum illo, aperiam
          praesentium excepturi eligendi.
        </p>
       </div>
     

      <div>
      <Slider {...settings}>
        {filterData.map((item)=>(
          <Cards item={item} key={item.id} />
        ))}
       
      </Slider>
      </div>
      </div>
    </>
  );
};

export default Freebook;
