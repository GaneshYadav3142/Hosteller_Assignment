"use client"
import { ApolloClient, ApolloProvider } from '@apollo/client'
import React from 'react'
import HostelCount from '../(components)/HostelCount'
import client from '../lib/apollo'
import store from '../redux/store'
import { Provider } from 'react-redux'
import Navbar from '../(components)/navbar'


const CountHostel = () => {
  return (
    <div>
    <ApolloProvider client={client}>
      <Navbar/>
        <HostelCount/>
    </ApolloProvider>
    </div>
  )
}


export default CountHostel
