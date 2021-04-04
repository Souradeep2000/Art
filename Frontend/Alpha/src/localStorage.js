export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (cart) => {
  try {
    const serializedState = JSON.stringify(cart);
    localStorage.setItem("cart", serializedState);
  } catch (error) {}
};
