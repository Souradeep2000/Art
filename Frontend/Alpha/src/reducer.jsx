import { loadState } from "./localStorage";

export const initialState = {
  basket: loadState(),
};

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      const inCart = state.basket.find((basketItem) =>
        basketItem.id === action.item.id ? true : false
      );
      return {
        ...state,
        basket: inCart
          ? state.basket.map((basketItem) =>
              basketItem.id === action.item.id
                ? { ...basketItem, qty: basketItem.qty + 1 }
                : basketItem
            )
          : [...state.basket, { ...action.item, qty: 1 }],
      };

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter(
          (basketItem) => basketItem.id !== action.id
        ),
      };

    case "ADJUST_QTY":
      return {
        ...state,
        basket: state.basket.map((basketItem) =>
          basketItem.id === action.item.id
            ? { ...basketItem, qty: action.item.qty }
            : basketItem
        ),
      };

    default:
      return state;
  }
};

export default reducer;
