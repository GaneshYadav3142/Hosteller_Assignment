"use client"
import React from 'react'
import { ApolloProvider, useQuery } from '@apollo/client';
import CafeTable from '../(components)/CafeTable';
import client from '../lib/apollo';

const page = () => {

   
  return (
    <div>
         <ApolloProvider client={client}>
      <CafeTable/>
        </ApolloProvider></div>
  )
}

export default page