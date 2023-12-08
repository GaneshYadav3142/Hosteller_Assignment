import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartActionType";

export const reducer = (state = [], action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return [...state, action.payload];
      case REMOVE_FROM_CART:{
        const updated=state.filter((item) => item.id !== action.payload);
        return updated
      }
      default:
        return state;
    }
  };
  
  
  