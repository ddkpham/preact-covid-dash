import React from "react";
import { h, render } from "preact";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { Router } from "preact-router";
import { ThemeProvider } from "@material-ui/core/styles";

import Header from "./components/Header";

import Home from "../src/routes/home";
import Compare from "../src/routes/compare";
import theme from "../src/styles/theme";

class App extends React.Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Compare path="/compare/" />
        </Router>
      </div>
    );
  }
}

render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
