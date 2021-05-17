export const cartDetailsReducer = (state = { basket: {} }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const inCart = state.basket.find((basketItem) =>
        basketItem._id === action.payload._id ? true : false
      );
      return {
        ...state,
        basket: inCart
          ? state.basket.map((basketItem) =>
              basketItem._id === action.payload._id
                ? { ...basketItem, qty: basketItem.qty + 1 }
                : basketItem
            )
          : [...state.basket, { ...action.payload, qty: 1 }],
      };
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter(
          (basketItem) => basketItem._id !== action._id
        ),
      };
    case "ADJUST_QTY":
      return {
        ...state,
        basket: state.basket.map((basketItem) =>
          basketItem._id === action.item._id
            ? { ...basketItem, qty: action.item.qty }
            : basketItem
        ),
      };
    default:
      return state;
  }
};
