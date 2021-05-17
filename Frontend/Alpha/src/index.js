import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
// import reducer, { initialState } from "./reducer";
// import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <StateProvider initialState={initialState} reducer={reducer}> */}
      <App />
      {/* </StateProvider> */}
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
