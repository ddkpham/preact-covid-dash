import React from "react";
import { h } from "preact";
import { CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Countries = (props) => {
  var countryStats = props.countryStats;
  return (
    <CardActionArea>
      <Typography gutterBottom variant="h5" component="h2">
        Country Statistics
      </Typography>
      <Typography variant="body2" component="p">
        <div>
          <ul>
            {/* ref: https://stackoverflow.com/questions/44139048/render-object-in-reactjs */}
            {Object.keys(countryStats).map((stats, index) => (
              <li key={index}>
                {stats} : {countryStats[stats]}
              </li>
            ))}
          </ul>
        </div>
      </Typography>
    </CardActionArea>
  );
};

export default Countries;
