"use client"
import { useQuery } from '@apollo/client';
import  {GET_DESTINATIONS}  from '../lib/graphql';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

const DestinationList = () => {
  const { loading, error, data } = useQuery(GET_DESTINATIONS);

  if (loading) return <LoadingSpinner />; // Use a loading spinner during data fetching
  if (error) return <p>Error: {error.message}</p>;

  return (
     <div> 
      <h1 className='text-center w-70'>Check Out Hostel Available </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto w-70 mt-10">
      {data.destinations.map((destination) => (
          <Link key={destination._id} href={`/destinationList/${destination._id}`}>
         
        <div key={destination._id} className="relative bg-white p-4 shadow-md rounded-md overflow-hidden group transition-transform transform hover:shadow-sm hover:scale-90">
          <img src={destination.image} alt={destination.name} className="w-full h-51 object-cover mb-4 group-hover:opacity-75 transition-opacity rounded-md" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-2xl font-extrabold text-white group-hover:text-gray-800">{destination.name}</h3>
          </div>
        </div>
        </Link>
      ))}
    </div>
    </div>
  );
};





export default DestinationList
