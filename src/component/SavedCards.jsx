import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SavedCards = () => {
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.savedCart.items); // Use 'savedCart' to match the slice name
  return (

    <>
    <div className="saved-cards mt-4">
      <h2 className="text-xl font-bold mb-4">Saved Cards</h2>
      {favoriteItems.length === 0 ? (
        <p>No saved cards yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteItems.map((item) => (
            <div key={item.id} className="card w-80 h-[450px] border rounded p-4">
              <figure>
                <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold">
                  {item.name}
                  <div className="badge badge-secondary ml-2">{item.category}</div>
                </h2>
                <p className="text-gray-700">{item.summary}</p>
                <div className="card-actions flex justify-between mt-4">
                  <div className="badge badge-outline">{item.price}</div>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    // onClick={() => dispatch(removeItemFromCart(item))}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
        
      
    </>
  )

}

export default SavedCards
