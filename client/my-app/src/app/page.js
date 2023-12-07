"use client"

import { Fragment } from "react";



export default function Home({children}) {
 
    return (
      <Fragment>
        
        <main>{children}</main>
      </Fragment>
    );
  
}
