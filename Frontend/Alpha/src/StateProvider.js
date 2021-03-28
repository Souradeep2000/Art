import React, { createContext, useContext, useReducer } from "react";
//to use the add basket method

//prepares the data layer
export const StateContext = createContext();

//wrap our app i.e; every components and provides the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull information from the data layer
export const useStateValue = () => useContext(StateContext);
//reducer is how we want to play with the data
