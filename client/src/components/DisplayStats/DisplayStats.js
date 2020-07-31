import React from "react";
import { h } from "preact";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GlobalStats from "../GlobalStats/GlobalStats";
import Countries from "../Countries/Countries";

const search = (value, array) => {
  value = value.toUpperCase().replace(/\s+/g, "");
  for (var i = 0; i < array.length; i++) {
    var country = array[i].Slug.toUpperCase().replace(/\s+/g, "");
    if (country == value) {
      return array[i];
    }
  }
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const DisplayStats = (props) => {
  var countryStats = search(props.selectedCountry, props.countries);
  var globalStats = props.globalStats;

  const classes = useStyles();

  if (countryStats == null) {
    return <div></div>;
  } else {
    return (
      <Card className={classes.root}>
        <GlobalStats stats={globalStats} />
        <Countries countryStats={countryStats} />
      </Card>
    );
  }
};

export default DisplayStats;
