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
var Slug = require("./models/Slug");
const fetch = require("node-fetch");
const fs = require("fs");

// Create DB connection
var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var slugs = [];

function slugCreate(record, cb) {
  const { Country, Slug: recordSlug } = record;

  const slugDetails = {
    country: Country,
    slug: recordSlug,
  };

  var slug = new Slug(slugDetails);

  slug.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New slug for : " + Country);
    slugs.push(slug);
    cb(null, slug);
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
          if (data.length == 0) {
            console.log("bad country: ", country);
          } else {
            slugCreate(data, function (err, results) {
              if (err) {
                console.log("FINAL ERR: " + err);
              } else {
                console.log("slugs: " + slugs);
              }
            });
          }
        })
        .catch((err) => {
          console.log("promise Chain end", err);
        });
    });

    // All done, disconnect from database
    mongoose.connection.close();
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
