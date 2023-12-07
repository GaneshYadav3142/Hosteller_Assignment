"use client"
import { useDispatch, useSelector } from 'react-redux';

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
   console.log(cart)
  return (
    <div>
      <h2>Cart</h2>
      {/* <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.image}
          </li>
        ))}
      </ul> */}
    </div>
  );
};


