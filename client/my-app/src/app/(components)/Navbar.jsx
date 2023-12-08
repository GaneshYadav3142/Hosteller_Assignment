"use client"
import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import "../../styles/Navbar.css"
import Link from 'next/link';
 const Navbar = () => {
    const [isResponsive, setResponsive] = useState(false);

    const toggleResponsive = () => {
      setResponsive(!isResponsive);
    };

  return (
   <div className={`topnav ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
    <Link href="/" className="active"> Home</Link>
    <Link href="/hostelcount" >Destination Hostel </Link>
    <Link href="/cart" >My Booking</Link>
    <a  href="#" className="icon"  onClick={toggleResponsive}>
    <GiHamburgerMenu/>
      </a>
   </div>
  )
}


export default Navbar