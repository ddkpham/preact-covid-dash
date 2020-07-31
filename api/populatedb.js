#! /usr/bin/env node

console.log(
  "This script populates db with stats from https://api.covid19api.com/. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require("async");
var DayStat = require("./models/DayStat");
const fetch = require("node-fetch");
const fs = require("fs");

// Create DB connection
var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var dayStats = [];

function dayStatCreate(record, cb) {
  const { Date, Country, Confirmed, Deaths, Recovered, Active } = record;
  const dayStatsDetails = {
    date: Date,
    country: Country,
    confirmed: Confirmed,
    deaths: Deaths,
    recovered: Recovered,
    active: Active,
  };

  var dayStat = new DayStat(dayStatsDetails);

  dayStat.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Day for : " + Country);
    dayStats.push(dayStat);
    cb(null, dayStat);
  });
}

fs.readFile("./initial/slugs.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    // for each country slug. fetch country data
    const countryRecords = JSON.parse(jsonString);
    countryRecords.forEach((country, index) => {
      const baseUrl = "https://api.covid19api.com/total/dayone/country/";
      const url = baseUrl + country.Slug;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((day) => {
            dayStatCreate(day, function (err, results) {
              if (err) {
                console.log("FINAL ERR: " + err);
              } else {
                console.log("Days: " + dayStats);
              }
            });
          });
        });
    });
    // All done, disconnect from database
    mongoose.connection.close();
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
