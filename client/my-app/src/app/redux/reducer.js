import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartActionType";

const reducer = (state = [], action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return [...state, action.payload];
      case REMOVE_FROM_CART:
        return state.filter((item) => item.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default reducer;
  