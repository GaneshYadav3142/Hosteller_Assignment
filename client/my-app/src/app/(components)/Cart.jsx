"use client"
import { useDispatch, useSelector } from 'react-redux';
import "../../styles/Cart.css"
import { removeFromCart } from '../redux/cartAction';
export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
   console.log(cart)
   const handleCancelBooking = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  return (
    <div className='container'>
      {cart.length===0?
      (<h2> You have No Bookings </h2>) :
     (
      <div>
      <h1>Total Booking- {cart.length}</h1>
      {cart.map((el)=>{
        return(
          <div className='cart-container'>
            <div className='image-container'><img src={el.image} alt='image'/></div>
            <div>
             <h3 className='title'>{el.name}</h3>
             <button className='cancel-booking' onClick={()=>handleCancelBooking(el.id)}>Cancel Booking</button>
            </div>
          </div>
        )
      })}
      </div>
     )
    }
    </div>
  );
};


