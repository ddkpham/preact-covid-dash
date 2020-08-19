import React, { useState, useEffect } from "react";
import { h } from "preact";
import { CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { baseURL } from "../../config/url";
import { getCall } from "../../apiCalls";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ActiveCard from "./ActiveCard";
import DeathCard from "./DeathCard";
import RecoveredCard from "./RecoveredCard";

import "./index.scss";

const provinces = [
  "British Columbia",
  "Prince Edward Island",
  "Alberta",
  "Yukon",
  "Ontario",
  "Manitoba",
  "Saskatchewan",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Quebec",
  "Northwest Territories",
  "Nova Scotia",
];

const provinceOptions = provinces.map((p, i) => ({ name: p, index: i }));

const RightPanel = (props) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [province, setProvince] = useState({
    name: "British Columbia",
    index: 0,
  });
  console.log("RightPanel -> province", province);
  console.log("RightPanel -> data", data);

  useEffect(() => {
    var today = new Date().toISOString();
    var yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 2);
    yesterday = yesterday.toISOString();

    today = today.split("T")[0] + "T00:00:00Z";
    yesterday = yesterday.split("T")[0] + "T00:00:00Z";

    console.log("RightPanel -> yesterday", yesterday);
    console.log("RightPanel -> today", today);
    function getData() {
      const url = `${baseURL}/country/canada?from=${yesterday}&to=${today}`;
      console.log("getData -> url", url);
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("getProfile -> payload", payload);
          setData(payload);
          setIsLoaded(true);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const provinceData = data.filter(
    (record) => record.Province == province.name
  );

  const infoCards = isLoaded ? (
    <div>
      <ActiveCard provinceData={provinceData} />
      <RecoveredCard provinceData={provinceData} />
      <DeathCard provinceData={provinceData} />
    </div>
  ) : null;

  console.log("RightPanel -> provinceData", provinceData);

  return (
    <div className="right-panel-container">
      <Card>
        <Autocomplete
          id="province-selector"
          options={provinceOptions}
          getOptionLabel={(option) => option.name}
          style={{ width: 250, margin: 10 }}
          renderInput={(params) => (
            <TextField {...params} label="Province" variant="outlined" />
          )}
          onChange={(e, value) => setProvince(value)}
        />
      </Card>
      {infoCards}
    </div>
  );
};

export default RightPanel;
