"use client"
import { useRouter } from 'next/router';
import React from 'react'
import HostelList from '../../(components)/HostelList';
import { ApolloProvider } from '@apollo/client';
import client from '../../lib/apollo';
import { Provider } from 'react-redux';
import store from '@/app/redux/store';
import ReduxProvider from '@/app/redux/ReduxProvider';
import Navbar from '@/app/(components)/navbar';

 const HostelPage = ({params}) => {
//    console.log(params)
//   //   const router = useRouter();

//   // const { id } = router.query;
// console.log(params)
  return (
    <ReduxProvider>
    <ApolloProvider client={client}>
      <Navbar />
    <HostelList destinationId={params} />
    </ApolloProvider>
    </ReduxProvider>
  )
}


export default HostelPage