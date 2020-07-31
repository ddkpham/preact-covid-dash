import React from "react";
import { h, Component } from "preact";
import "./index.css";
import AppBar from "../../components/MenuAppBar";
import Chart from "../../components/Chart";
import CountryDropDown from "../../components/CountryDropDown";
import DisplayStats from "../../components/DisplayStats/DisplayStats";

export default class Compare extends Component {
  state = {
    globalStats: {},
    countries: [],
    selectedCountry1: "",
    selectedCountry2: "",
    countrySelected1: false,
    countrySelected2: false,
  };

  changeCountry1 = (country) => {
    this.setState({ selectedCountry1: country });
    this.setState({ countrySelected1: true });
  };

  changeCountry2 = (country) => {
    this.setState({ selectedCountry2: country });
    this.setState({ countrySelected2: true });
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

  render(
    {},
    {
      countrySelected1,
      countrySelected2,
      globalStats,
      selectedCountry1,
      selectedCountry2,
      countries,
    }
  ) {
    return (
      <div className="compare-outerContainer">
        {/* <AppBar goToHomePage={this.goToHomePage} /> */}
        <div className="compare-resultsContainer">
          <div className="compare-countrySelector">
            <CountryDropDown changeCountry={this.changeCountry1} />
          </div>
          {countrySelected1 ? <Chart country={selectedCountry1} /> : null}
          <div className="compare-statisticsContainer">
            {countrySelected1 ? (
              <DisplayStats
                selectedCountry={selectedCountry1}
                globalStats={globalStats}
                countries={countries}
              />
            ) : null}
          </div>
        </div>
        <div className="compare-resultsContainer">
          <div className="compare-countrySelector">
            <CountryDropDown changeCountry={this.changeCountry2} />
          </div>
          {countrySelected2 ? <Chart country={selectedCountry2} /> : null}
          <div className="compare-statisticsContainer">
            {countrySelected2 ? (
              <DisplayStats
                selectedCountry={selectedCountry2}
                globalStats={globalStats}
                countries={countries}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
