import { gql, useQuery } from '@apollo/client';
import LoadingSpinner from '../(components)/LoadingSpinner';

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

export const GET_CAFE_MASTER=gql`
query {
  getCafeMaster {
    _id
    cafeName
    hostel{
      _id
      name
    }
  }
}
`

export const GET_MASTER_MENU = gql`
query {
  getMasterMenu {
    _id
    itemName
    itemCategory
  }
}
`

export const CREATE_CAFEWISE_MENU= gql`
mutation($cafewiseMenuInput: [CafewiseMenuInput]){
  addCafewiseMenu(cafewiseMenuInput: $cafewiseMenuInput) {
    tat
  }
}

`

export const  GET_BY_CAFE_ID = gql`
query  GetCafewiseMenuBycafeId($cafeId:ID){
     getCafewiseMenuBycafeId(cafeId:$cafeId){
      _id
       itemName
       itemCategory
        endTime
        startTime
        tat
        seasonCharge
        active
        soldOut
     }
}
`

// export const useGetAllCafeMaster =()=>{
//   const {loading,error,data,refetch}= useQuery(GET_CAFE_MASTER)
//   if (loading) return <LoadingSpinner/>;
//   return {error, data, refetch}
// }

// export const useGetAllMasterMenu =()=>{
//   const {loading,error,data,refetch}= useQuery(GET_MASTER_MENU)
//   if (loading) return <LoadingSpinner/>;
//   return {error, data, refetch}
// }