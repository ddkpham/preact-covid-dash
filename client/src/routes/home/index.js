import React from "react";
import { h, Component } from "preact";
import "../../index.css";
import AppBar from "../../components/MenuAppBar";
import ReadMeCard from "../../components/ReadMeCard";
import Chart from "../../components/Chart";
import CountryDropDown from "../../components/CountryDropDown";
import DisplayStats from "../../components/DisplayStats/DisplayStats";
import { baseURL } from "../../config/url";

export default class Home extends Component {
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
    const url = `${baseURL}summary`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Home -> componentDidMount -> data", data);
    this.setState({ globalStats: data.Global, countries: data.Countries });
  }

  render({}, { countrySelected, globalStats, selectedCountry, countries }) {
    return (
      <div className="outerContainer">
        <AppBar goToHomePage={this.goToHomePage} />
        <div className="read-me">
          <CountryDropDown changeCountry={this.changeCountry} />
          {countrySelected ? null : <ReadMeCard />}
        </div>
        {countrySelected ? <Chart country={selectedCountry} /> : null}
        <div className="statisticsContainer">
          {countrySelected ? (
            <DisplayStats
              selectedCountry={selectedCountry}
              globalStats={globalStats}
              countries={countries}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
