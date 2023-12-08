"use client"
import { useQuery } from '@apollo/client';
import {  GET_HOSTELS_COUNT_BY_DESTINATION } from '../lib/graphql';
import "../../styles/HostelCount.css"
import LoadingSpinner from './LoadingSpinner';
 const HostelCount = () => {
  const { loading, error, data } = useQuery(GET_HOSTELS_COUNT_BY_DESTINATION);
console.log(data)
  if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='container'>
      <h1 className='header'>Hostel Count in Each Destination</h1>
      <div className='hostelcount-container'>
        {data.hostelCountByDestination.map((ele,i) => {
         return( <div key={i} className='main-body'>
            <div className='image-container'>
           <img src={ele.destination.image} alt='image'/>
           </div>
            <div className='content'>
            <h1>{ele.destination.name}</h1>
              <p>No.of Hostels - {ele.count}</p>
              </div>
          </div>)
 })}
      
    </div>
    </div>
  );
};



export default HostelCount