import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App";

import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, actionLogout } from "./actions/index";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const userDecoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(userDecoded));
  const currentTime = Date.now() / 1000;
  console.log(userDecoded.exp, currentTime);

  if (userDecoded.exp < currentTime) {
    store.dispatch(actionLogout());
    window.location.href = "/login";
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
