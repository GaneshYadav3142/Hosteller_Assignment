"use client"
import { useQuery } from '@apollo/client';
import { GET_HOSTELS_BY_DESTINATION } from '../lib/graphql';
import "../../styles/HostelList.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartAction';
import LoadingSpinner from '../(components)/LoadingSpinner';
const HostelList = ({ destinationId }) => {
  console.log(destinationId.id)
  const id=destinationId.id
  const { loading, error, data } = useQuery(GET_HOSTELS_BY_DESTINATION, {
    variables: { destinationId:id },
  });

  const cart = useSelector((state) => state.cart);

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error: {error.message}</p>;


  
  const dispatch = useDispatch();
  const handleBookNow = (item) => {
  const isItemInCart = cart.find((cartItem) => cartItem.id === item._id);
  if (isItemInCart) {
    alert("Hostel is already booked by you! Check My Booking");
  } else {
    
    dispatch(addToCart({ id: item._id, name: item.name, image: item.image }));
    alert("Booking Successful");
  }
  };
  return (
    <div className="hostel-container">
    <h2 className="heading">Hostels Available</h2>
    <div className="data-div">
      {data.hostelsByDestination.map((hostel) => (
        <div key={hostel._id} className="hostel-card">
          <div className="image-container">
            <img
              src={hostel.image}
              alt={hostel.name}
              className="hostel-image"
            />
          </div>
          <div className="hostel-details">
            <h3 className="hostel-name">{hostel.name}</h3>
            <button className="book-now-button" onClick={()=>handleBookNow(hostel)} >Book Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
};




export default HostelList