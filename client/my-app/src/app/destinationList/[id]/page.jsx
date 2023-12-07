"use client"
import { useRouter } from 'next/router';
import React from 'react'
import HostelList from '../HostelList';
import { ApolloProvider } from '@apollo/client';
import client from '../../lib/apollo';

 const HostelPage = ({params}) => {
//    console.log(params)
//   //   const router = useRouter();

//   // const { id } = router.query;
// console.log(params)
  return (
    <ApolloProvider client={client}>
    <HostelList destinationId={params} />
    </ApolloProvider>
  )
}


export default HostelPage