"use client"


import React from 'react'
import DestinationList from '../(components)/destinationList'
import { ApolloCache, ApolloProvider } from '@apollo/client'
import client from '../lib/apollo'
import store from '../redux/store'
import { Provider } from 'react-redux'
import ReduxProvider from '../redux/ReduxProvider'

 const Page = () => {
  return (
    <ReduxProvider>
  <ApolloProvider client={client}>
      <DestinationList />
      </ApolloProvider>
      </ReduxProvider>
  )
}

export default Page