export const initialState = {
  basket: [],
};

//selector very powerfull function
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item], //but we are gonna change the basket and the basket should be whatever we added
      };

    case "REMOVE_FROM_BASKET":
      console.log(action.id);
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id //maps through all the basket item and checks does any basket id matches the action id
      );

      console.log(index);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Can't remove this product as its not in in your basket!");
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
