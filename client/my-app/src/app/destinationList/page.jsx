"use client"


import React from 'react'
import DestinationList from './destinationList'
import { ApolloCache, ApolloProvider } from '@apollo/client'
import client from '../lib/apollo'

 const Page = () => {
  return (
  <ApolloProvider client={client}>
     <Provider store={store}>
      <DestinationList />
      </Provider>
      </ApolloProvider>
  )
}

export default Page