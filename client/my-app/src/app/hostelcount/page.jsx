"use client"
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import HostelCount from '../components/HostelCount'
import client from '../lib/apollo'


const CountHostel = () => {
  return (
    <div>
    <ApolloProvider client={client}>
        <HostelCount/>
    </ApolloProvider>
    </div>
  )
}


export default CountHostel
