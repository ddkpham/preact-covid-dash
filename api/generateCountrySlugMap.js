const fetch = require("node-fetch");
const fs = require("fs");

fs.readFile("./initial/slugs.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    const countryRecords = JSON.parse(jsonString);
    const countrySlugMap = {};
    countryRecords.forEach((rec) => {
      countrySlugMap[`${rec.Slug}`] = rec.Country;
    });
    console.log("countrySlugMap", countrySlugMap);

    console.log("test: ", countrySlugMap["norfolk-island"]);
    let map = JSON.stringify(countrySlugMap);
    fs.writeFileSync("country-slug-map.json", map);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
