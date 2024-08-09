import React, { useState } from "react";
import { UseDispatch,useDispatch,useSelector } from "react-redux";
import { addItemToCart,removeItemFromCart } from "../Redux/savedCartSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";

import list from "../assets/list.json";

const Cards = ({ item }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch();
  
  const isFavorite = useSelector((state) =>
    state.savedCart.items.some((cartItem) => cartItem.id === item.id)
  )


  const handleRating = (rate) => {
    setRating(rate);
    // sethover(rating);
  };

  const getRatingLabel = (rate) => {
    if (rating ===1) {
      return "Worst";
    } else if (rating === 2) {
      return "Bad";
    } else if (rating ===3) {
      return "Average";
    } else if (rating ===4) {
      return "Awesome";
    } else if (rating ===5) {
      return "Best";
    }
    return "";
  };

  const toggleFavorite=()=>{
    if(isFavorite){
      dispatch(removeItemFromCart(item))
    }
    else{
      dispatch(addItemToCart(item))
    }
  }
  return (
    <>
      <div className="mt-4 overflow-hidden my-3 w-80 h-[450px] space-x-5 hover:scale-105 duration-200  ">
        <div className="card">
          <figure>
            <img className="" src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.summary}</p>
            <div className="card-actions flex  justify-between">
              <div className="badge badge-outline mb-36">{item.price}</div>
              <button
            className=" mt-2 flex items-center space-x-2 text-red-500 hover:text-red-700 focus:outline-none"
            onClick={toggleFavorite}
          >
            <i
              className={`fas fa-heart ${
                isFavorite ? 'text-red-600' : 'text-gray-300'
              }`}
            ></i>
            <span>{isFavorite ? 'Favorited' : 'Add to Favorite'}</span>
          </button>            
              <div className="mt-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star ${
                        star <= (hover || rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(rating)}
                      style={{ cursor: "pointer", transition: "color 0.2s" }}
                    ></i>
                  ))}
                </div>

                <p className="mt-2  text-black">{getRatingLabel()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
