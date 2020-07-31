const fetch = require("node-fetch");

// first fetch list of all countries

const buildCountryFetchFuncList = async (countries, fn) => {
  const fnList = await countries.map((record) => {
    return fn(record.Slug);
  });
  return fnList;
};

const seedDB = async () => {
  // get countries
  fetch("https://api.covid19api.com/countries")
    .then((res) => res.json())
    .then((countries) => {
      const fetchCountryDataFunc = (country) => {
        const baseUrl = "https://api.covid19api.com/dayone/country/";
        const url = baseUrl + country;
        return;
      };
      return buildCountryFetchFuncList(countries, fetchCountryDataFunc);
    })
    .then((list) => {
      console.log("list", list);
    });
};

seedDB();
