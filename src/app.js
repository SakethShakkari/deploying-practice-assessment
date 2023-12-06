const express = require("express");
const app = express();
const validateZip = require("./middleware/validateZip.js");
const getZoos = require("./utils/getZoos.js");

const validateZoo = (req, res, next) => {
  const zip = req.params.zip;
  if (getZoos(req.params.zip)) {
    if (req.url.includes("check"))
      res.send(`${req.params.zip} exists in our records.`);
    else if (req.url.includes("zoos")) {
      const zoosList = getZoos(req.params.zip);

      if (zoosList.length > 0) {
        let result = zoosList[0];
        for (let i = 1; i < zoosList.length; i++) result += "; " + zoosList[i];
        res.send(`${req.params.zip} zoos: ` + result);
      } else next();
    }
  } else {
    next();
  }
};

const getAllZoo = (req, res, next) => {
  const q = req.query.admin;

  if (q == "true") {
    const list = getZoos();
    let result = list[0];
    for (let i = 1; i < list.length; i++) result += "; " + list[i];
    res.send("All zoos: " + result);
  } else {
    res.send("You do not have access to that route.");
  }
};
app.get("/check/:zip", validateZip, validateZoo, (req, res, next) => {
  next(`${req.params.zip} does not exist in our records.`);
});
app.get("/zoos/all", getAllZoo);
app.get("/zoos/:zip", validateZip, validateZoo, (req, res, next) => {
  next(`${req.params.zip} has no zoos.`);
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.use((req, res, next) => {
  res.send("That route could not be found!");
});
module.exports = app;
