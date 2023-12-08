"use client"
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { Cart } from '../(components)/Cart'
import client from '../lib/apollo'
import { Provider } from 'react-redux'
import store from '../redux/store'
import ReduxProvider from '../redux/ReduxProvider'
import Navbar from '../(components)/navbar'

 const CartPage = () => {
  return (
    <div>
     <ReduxProvider>
        <ApolloProvider client={client}>
          <Navbar/>
            <Cart/>
        </ApolloProvider>
        </ReduxProvider>
    </div>
  )
}


export default CartPage