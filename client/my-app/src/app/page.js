"use client"

import { Fragment } from "react";
import client from "./lib/apollo";
import { ApolloProvider } from "@apollo/client";
import DestinationList from "./(components)/destinationList";
import store from "./redux/store";
import Navbar from "./(components)/Navbar";
import { Provider } from "react-redux";



export default function Home() {
 
    return (
      <Fragment>
        <Provider store={store}>
        <ApolloProvider client={client}>
          <Navbar/>
        <DestinationList/>
          </ApolloProvider>
          </Provider>
      </Fragment>
    );
  
}
