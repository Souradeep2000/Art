// for cart
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
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
  } catch (error) {
    return undefined;
  }
};

// for view product
export const loadOneProduct = () => {
  try {
    const serializedState = localStorage.getItem("current-product");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveOneProduct = (singleProduct) => {
  try {
    const serializedState = JSON.stringify(singleProduct);
    localStorage.setItem("current-product", serializedState);
  } catch (error) {}
};
