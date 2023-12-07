"use client"
import React from 'react'
import {  ApolloProvider } from '@apollo/client'
import client from '../lib/apollo'
import { HostelList } from '../components/HostelList'

 const Page = () => {
  return (
  <ApolloProvider client={client}>
     <HostelList/>
      </ApolloProvider>
  )
}

export default Page