/* eslint-disable no-use-before-define */
import React from "react";
import { h, Component } from "preact";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class CountryDropDown extends Component {
  state = {
    options: [],
  };
  async componentDidMount() {
    const url = "http://localhost:3000/api/options";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ options: data.data });
  }

  setCountry = (value) => {
    if (value) {
      const { changeCountry } = this.props;
      const { Slug } = value;
      changeCountry(Slug);
    }
  };

  render({}, { options }) {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.Country}
        style={{ width: 300 }}
        onChange={(event, value) => {
          this.setCountry(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Country" variant="outlined" />
        )}
      />
    );
  }
}

export default CountryDropDown;
