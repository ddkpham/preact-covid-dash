var express = require("express");
var router = express.Router();
var slugCountryMap = require("./country-slug-map.json");
var options = require("./slugs.json");
const DayStats = require("../models/DayStat");

router.get("/options", function (req, res, next) {
  res.json({
    confirmation: "success",
    data: options,
  });
});

/* GET users listing. */
router.get("/stats/:id", function (req, res, next) {
  const {
    params: { id },
  } = req;
  console.log("fetching ", id);

  DayStats.find({
    country: slugCountryMap[id],
  })
    .sort({ date: "asc" })
    .then((daystats) => {
      res.json({
        confirmation: "success",
        data: daystats,
      });
    })
    .catch((err) => {
      res.json({
        confirmation: "fail",
        message: err.message,
      });
    });
});

module.exports = router;
