"use client"
import { useQuery } from '@apollo/client';
import { GET_HOSTELS_BY_DESTINATION } from '../lib/graphql';
import "../../styles/HostelList.css"
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartAction';
const HostelList = ({ destinationId }) => {
  console.log(destinationId.id)
  const id=destinationId.id
  const { loading, error, data } = useQuery(GET_HOSTELS_BY_DESTINATION, {
    variables: { destinationId:id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const dispatch = useDispatch();

  const handleBookNow = (item) => {
    dispatch(addToCart(item));
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
            <button className="book-now-button" onClick={()=>handleBookNow(hostel)}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
};


export default HostelList