import { useQuery } from '@apollo/client';
import { GET_HOSTELS_BY_DESTINATION } from '../lib/graphql';

export const HostelList = ({ destinationId }) => {
  const { loading, error, data } = useQuery(GET_HOSTELS_BY_DESTINATION, {
    variables: { destinationId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Hostels in this Destination</h2>
      <ul>
        {data.hostelsByDestination.map((hostel) => (
          <li key={hostel._id}>
            {hostel.name} - <img src={hostel.image} alt={hostel.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};


