import { gql } from '@apollo/client';

export const GET_DESTINATIONS = gql`
  query {
    destinations {
      _id
      name
      image
    }
  }
`;

export const GET_HOSTELS_BY_DESTINATION = gql`
  query GetHostelsByDestination($destinationId: ID!) {
    hostelsByDestination(destinationId: $destinationId) {
      _id
      name
      image
    }
  }
`;

export const ADD_HOSTEL = gql`
  mutation AddHostel($name: String!, $image: String, $destinationId: ID!) {
    addHostel(name: $name, image: $image, destinationId: $destinationId) {
      _id
      name
      image
      destination {
        _id
        name
        image
      }
    }
  }
`;


export const GET_HOSTELS_COUNT_BY_DESTINATION=gql`
query {
  hostelCountByDestination{
    count 
    destination {
      name
      image
    }
  }
}
`