import React from "react";
import { h, render } from "preact";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AppBar from "./components/MenuAppBar";
import ReadMeCard from "./components/ReadMeCard";
import Chart from "./components/Chart";
import CountryDropDown from "./components/CountryDropDown";
import DisplayStats from "./components/DisplayStats/DisplayStats";

class App extends React.Component {
  state = {
    globalStats: {},
    countries: [],
    selectedCountry: "",
    countrySelected: false,
  };

  changeCountry = (country) => {
    console.log("App -> changeCountry -> country", country);
    this.setState({ countrySelected: false });
    this.setState({ selectedCountry: country });
    this.setState({ countrySelected: true });
  };

  goToHomePage = () => {
    this.setState({ countrySelected: false });
  };

  async componentDidMount() {
    const url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ globalStats: data.Global, countries: data.Countries });
  }

  render({}, { countrySelected, globalStats, selectedCountry, countries }) {
    return (
      <div className="statistics">
        <AppBar goToHomePage={this.goToHomePage} />
        <div className="read-me">
          <CountryDropDown changeCountry={this.changeCountry} />
          {countrySelected ? null : <ReadMeCard />}
        </div>
        {countrySelected ? <Chart country={selectedCountry} /> : null}
        {countrySelected ? (
          <DisplayStats
            selectedCountry={selectedCountry}
            globalStats={globalStats}
            countries={countries}
          />
        ) : null}
      </div>
    );
  }
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
