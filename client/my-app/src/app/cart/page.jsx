"use client"
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { Cart } from '../(components)/Cart'

export const CartPage = () => {
  return (
    <div>
        <ApolloProvider>
            <Cart/>
        </ApolloProvider>
    </div>
  )
}
