import React from "react";
import { h } from "preact";
import { CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const GlobalStats = (props) => {
  var globalStats = props.stats;
  return (
    <CardActionArea>
      <Typography gutterBottom variant="h5" component="h2">
        Global Statistics
      </Typography>
      <Typography variant="body2" component="p">
        <div>
          <ul>
            {/* ref: https://stackoverflow.com/questions/44139048/render-object-in-reactjs */}
            {Object.keys(globalStats).map((stats, index) => (
              <li key={index}>
                {stats} : {globalStats[stats]}
              </li>
            ))}
          </ul>
        </div>
      </Typography>
    </CardActionArea>
  );
};

export default GlobalStats;
